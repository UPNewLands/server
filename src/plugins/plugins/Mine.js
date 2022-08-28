import Plugin from '../Plugin'


export default class Item extends Plugin {

    constructor(users, rooms) {
        super(users, rooms)
        this.events = {
            'update_coins': this.updateCoins,
            'add_mine_coins': this.addMineCoins,
            'delete_mine' : this.deleteKey
        }
        this.totalcoins = {};
        this.max = 125;
    }

    async updateCoins(args, user) {
        let userData = await this.db.getUserById(args.id);
        user.send('update_coins', {coins: userData.dataValues.coins})
    }

    addMineCoins(args, user) {
        if (!(args.miningId in this.totalcoins)) {
            this.totalcoins[args.miningId] = 0;
        }

        console.log(this.totalcoins)

        if (args.coins > this.max) {
            user.send('error', {error: 'There was an error adding your coins'});
            return user.send('mining_error', {miningError:3,total:this.totalcoins,id:args.id})
        } else if (user.lastMined && ((new Date).getTime() - user.lastMined < args.timer - 100)) {
            return user.send('mining_error', {miningError:2,total:this.totalcoins,id:args.id})
        } else if (this.totalcoins[args.miningId] >= 100) {
            return user.send('mining_error', {miningError:1,total:this.totalcoins,id:args.id})
        } 
        
        user.updateCoins(args.coins)
        this.totalcoins[args.miningId] += args.coins;
        user.lastMined = (new Date).getTime()
        if (this.totalcoins[args.miningId] >= this.max) {
            return user.send('mining_error', {miningError:1,total:this.totalcoins})
        }
        return user.send('mining_error', {miningError:0,total:this.totalcoins,id:args.id})
    }
 
    deleteKey(args,user) {
        if (!(args.miningId in this.totalcoins) || args.miningId === undefined) return;

        delete this.totalcoins[args.miningId];
        return user.send("reset_mining", {tc:this.totalcoins})
    }

}