import Plugin from '../Plugin'


export default class Chat extends Plugin {

    constructor(users, rooms) {
        super(users, rooms)
        this.events = {
            'send_message': this.sendMessage,
            'send_safe': this.sendSafe,
            'send_emote': this.sendEmote
        }

        this.commands = {
            'ai': this.addItem,
            'af': this.addFurniture,
            'ac': this.addCoins,
            'jr': this.joinRoom,
            'users': this.userPopulation,
            'v': this.verifyUser
        }

        this.bindCommands()
    }

    // Events

    sendMessage(args, user) {
        // Todo: message validation
        if (args.message.startsWith('!')) {
            return this.processCommand(args.message.substring(1), user)
        }
        this.discord.logChatMessage(user.data.username, args.message, user.room.name)
        user.room.send(user, 'send_message', { id: user.data.id, message: args.message }, [user], true)
    }

    sendSafe(args, user) {
        user.room.send(user, 'send_safe', { id: user.data.id, safe: args.safe }, [user], true)
    }

    sendEmote(args, user) {
        user.room.send(user, 'send_emote', { id: user.data.id, emote: args.emote }, [user], true)
    }

    // Commands

    bindCommands() {
        for (let command in this.commands) {
            this.commands[command] = this.commands[command].bind(this)
        }
    }

    processCommand(message, user) {
        let args = message.split(' ')
        let command = args.shift()

        if (command in this.commands) {
            return this.commands[command](args, user)
        }
    }

    addItem(args, user) {
        this.discord.addItemLogs(user.data.name,user.data.name,aegs[0])
        if (user.data.rank > 4) {
            this.plugins.item.addItem({ item: args[0] }, user)
        }
    }

    async verifyUser(args, user) {
        if (user.data.rank < 4) {
            user.send('error', {
                error: 'You do not have permission to perform this action.'
            })
			return
        }

        let users = await this.db.getUnverifedUsers()

        if (users) {
            user.send('get_unverified_users', {
                users: users
            })
        }
    }

    addFurniture(args, user) {
        if (user.data.rank > 4) {
            this.plugins.igloo.addFurniture({ furniture: args[0] }, user)
        }
    }

    addCoins(args, user) {
        if (user.data.rank > 4) {
            user.updateCoins(args[0])
            user.send('game_over', { coins: user.data.coins })
        }
    }

    joinRoom(args, user) {
        if (user.data.rank > 4) {
            this.plugins.join.joinRoom({ room: args[0] }, user)
        }
    }

    userPopulation(args, user) {
        user.send('error', { error: `Users online: ${this.handler.population}` })
    }

}
