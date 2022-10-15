import Plugin from '../Plugin'


export default class MiniGame extends Plugin {

    constructor(network) {
        super(network)
        this.events = {
            'start_game': this.startGame,
            'send_move': this.sendMove,
            'game_over': this.gameOver,
			'end_ruffle_mingame': this.endRuffleMinigame,
			'check_legit': this.checkLegit,
            'init_four': this.initFour,
			'place_counter': this.placeCounter,
			'change_turn': this.changeTurn,
			'four_over': this.fourOver
        }
    }
	
	get client() {
        return this.world.client
    }

    startGame(args) {
        this.world.room.handleStartGame(args)
    }

    sendMove(args) {
        this.world.room.handleSendMove(args)
    }

    gameOver(args, user) {
        if (!user.room.game) {
            return
        }

        user.updateCoins(args.coins)

        user.send('game_over', { coins: user.data.coins })
    }
	
    endRuffleMinigame(args, user) {
        if (!args.coins || args.coins < 0) { return }
        user.send('check_legit', {game: args.game, coinsEarned: args.coins})
        user.pending = true
        user.pendingCoins = args.coins
    }

    async checkLegit(args, user) {
        if (!user.pending || !args.coins || args.coins < 0) { return }
        let payoutFrequency = args.coins * 50
        if (user.lastPayout > ((new Date()).getTime() - payoutFrequency)) {
            return user.send('error', { error: 'You have earned too many coins too quickly! These coins have not been added as we fear they may have been cheated.' })
        }
        if (user.pending && user.pendingCoins === args.coins && args.coins < 15000) {
            user.pending = false
            user.pendingCoins = 0
            user.lastPayout = (new Date()).getTime()
            user.updateCoins(args.coins)
            user.send('end_ruffle_mingame', { coins: user.data.coins, game: args.game, coinsEarned: args.coins })

        }
        else {
            user.send('error', { error: 'There was an error adding your coins' })
        }
    }

    initFour(args) {
        this.interface.main.findFour.init(args.users, args.turn)
    }
	
	placeCounter(args) {
		let colour;
		if (args.user == this.world.client.id) { colour = this.interface.main.findFour.seat + 1 }
		else if ( this.interface.main.findFour.seat == 0 ) { colour = 2 }
		else { colour = 1 }
		
		this.interface.main.findFour.placeCounter(args.row, args.column, colour)
	}
	
	changeTurn(args) {
		this.interface.main.findFour.changeTurn(args.turn)
	}
	
	fourOver(args) {
		this.interface.main.findFour.reset()
	}

}

