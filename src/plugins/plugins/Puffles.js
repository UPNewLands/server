import Plugin from '../Plugin'


export default class Puffles extends Plugin {

    constructor(users, rooms) {
        super(users, rooms)
        this.events = {
            'adopt_puffle': this.adoptPuffle,
            'get_puffles': this.getPuffles,
            'get_wellbeing': this.getWellbeing,
            'stop_walking': this.stopWalking,
            'get_puffle_color': this.getPuffleColor,
            'walk_puffle': this.walkPuffle,
            'get_puffle_count': this.getPuffleCount,
            'puffle_dig' : this.PuffleDig,   
            'play_puffle_anim': this.sendPuffleAnim,
            'puffle_timeout': this.timeout,
        }

        this.clothing = [3028,232,412,112,184,1056,6012,118,774,366,103,498,469,1082,5196,790,4039,326,105,122,5080,111]
        this.furniture = [305,313,504,506,500,503,501,507,505,502,616,542,340,150,149,369,370,300]
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    prob(n) {
        return !!n && Math.random() <= n;
    }


    async timeout(args,user) {
        if (user.data.lastDigging && ((new Date).getTime() - user.data.lastDigging < 60000 * 2)) {
            return user.send("puffle_timeout", {timeout:false})
        }
        return user.send("puffle_timeout", {timeout:true})
    }

    async PuffleDig(args, user) {
        if (user.data.lastDigging && ((new Date).getTime() - user.data.lastDigging < 60000 * 2)) {
            return user.send("puffle_timeout", {timeout:true})
        }

        let res = await this.db.updatelastDig(user.data.id)
        user.data.lastDigging = res;


        let coins = this.getRndInteger(25,150)
        user.updateCoins(coins)
        return user.send("puffle_dig", {type: "coins", coins: coins})

        // if (this.prob(0.25)) {
        //     if (this.prob(.5)) {
        //         let items = this.clothing[Math.floor(Math.random()*this.clothing.length)]
        //         return user.send("puffle_digging", {type: "clothes", coins: coins, item: items})
        //     } else {
        //         let items = this.furniture[Math.floor(Math.random()*this.furniture.length)]
        //         return user.send("puffle_digging", {type: "furniture", coins: coins, item: items})
        //     }
        // } else {
        //     return user.send("puffle_digging", {type: "coins", coins: coins})
        // }
    }

    async adoptPuffle(args, user) {
        let type = args.type
        let name = args.name.charAt(0).toUpperCase() + args.name.slice(1);

        let cost = (await this.db.getPuffleCost(type)).dataValues.cost
        const puffles = await this.db.getPuffles(user.data.id)

        if (puffles.length >= 15) {
            user.send('error', { error: "You already have 15 puffles." })
            return
        } else if (user.lastPuffle && ((new Date).getTime() - user.lastPuffle < 60000 * 5)) {
            return user.send('error', { error: 'You need to wait 5 minutes since buying your last puffle.' })
        } else if (cost > user.data.coins) {
            return user.send('error', { error: 'You need more coins.' })
        } else if (name.length > 8) {
            return user.send('error', { error: 'Puffle name can\'t be greater than 8 chars.' })
        } else if (name.length <= 2) {
            return user.send('error', { error: 'Puffle name needs to be atleast 3 characters.' })
        } 
        
        user.updateCoins(-cost)
        user.lastPuffle = (new Date).getTime()
        let puffle = await this.db.adoptPuffle(user.data.id, type, name)

        user.send('adopt_puffle', { puffle: puffle.id, coins: user.data.coins, color: puffle.color })
        // let postcard = await this.db.userPostcards.create({ userId: user.data.id, id: 111, sender: "Club Penguin Forever", details: name })
        // if (postcard) {
        //     user.postcards = await this.db.getPostcards(user.data.id)
        //     user.send('update_postcards', { postcards: user.postcards })
        // }
    }

    async getPuffles(args, user) {
        if (!args.userId) {
            return
        }
        let userId = args.userId
        let puffles = await this.db.getPuffles(userId)
        if (puffles) {
            user.send('get_puffles', {
                userId: userId,
                puffles: puffles
            })
        }
    }

    async getWellbeing(args, user) {
        if (!args.puffle) {
            return
        }
        let puffleId = args.puffle
        let wellbeing = await this.db.getWellbeing(puffleId)
        if (wellbeing) {
            user.send('get_wellbeing', {
                puffleId: puffleId,
                clean: wellbeing.clean,
                food: wellbeing.food,
                play: wellbeing.play,
                rest: wellbeing.rest,
                name: wellbeing.name
            })
        }
    }

    async stopWalking(args, user) {
        if (user.data.walking !== 0){
            user.data.walking = 0
            user.update({ walking: user.data.walking})
            user.room.send(user, 'stop_walking', {user: user.data.id}, [])
        } 
    }

    async walkPuffle(args, user) {
        if (user.data.puffle !== 0) {
            user.data.walking = 0
            user.update({ walking: user.data.walking})
            user.room.send(user, 'stop_walking', {user: user.data.id, puffle: 0}, [])
        }
        if (args.puffle !== 0){
            user.data.walking = args.puffle
            user.update({ walking: user.data.walking})
            user.room.send(user, 'walk_puffle', {user: user.data.id, puffle: args.puffle}, [])
        }
    }

    async getPuffleColor(args, user) {
        if (!args.puffle) {
            return
        }
        let puffleId = args.puffle
        let puffleColor = await this.db.getPuffleColor(puffleId)
        if (puffleColor) {
            user.send('get_puffle_color', {
                penguinId: args.penguinId,
                color: puffleColor.color
            })
        }
    }

    async getPuffleCount(args, user) {
        if (!user.data.id) {
            return
        }
        let puffleCount = await this.db.getPuffleCount(user.data.id)
        if (puffleCount) {
            user.send('get_puffle_count', {
                count: puffleCount
            })
        }
    }

    async sendPuffleAnim(args, user) {
        return user.room.send(user, 'play_puffle_anim', {id:user.data.id, anim: args.anim}) 
    }
}
