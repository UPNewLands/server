import Plugin from '../Plugin'


export default class Actions extends Plugin {

    constructor(users, rooms) {
        super(users, rooms)
        this.events = {
            'send_position': this.sendPosition,
            'send_frame': this.sendFrame,
            'snowball': this.snowball,
            'stamp_earned': this.stampEarned,
            'save_stampbook': this.saveStampbook,
            'report_player': this.reportPlayer,
            'add_candy': this.addCandy,
            'addSeen': this.addSeen,
            'get_count': this.getCount,
            'update_count': this.updateCount,
        },
        this.fakeReports = 0;
    }

    async getCount(args, user) {
        let count = await this.db.checkCount("halloween")
        return user.send("update_count", {count: parseInt(count.count)})
    }

    async updateCount(args, user) {
        let count = await this.db.checkCount("halloween")
        count = parseInt(count.count)
        count += 1
        this.db.updateCount("halloween", count)
        return user.send("update_count", {count: count})        
    }

    async addCandy(args, user) {
        let candy = this.getCandy(args, user);
        if (candy == 1) {
            return
        }
        user = await this.updateCandy(args, user)
        user.send("add_candy", {candy1: user.data.candy1, candy2: user.data.candy2, candy3: user.data.candy3, candy4: user.data.candy4, })
    }

    async addSeen(args, user) {
        if(user.data.intro == 0) {await this.db.seenIntro(user.data.id)}
    }

    getCandy(args, user) {
        let candy;
        switch(args.candy) {
            case 1:
                candy = user.data.candy1       
                break;
            case 2: 
                candy = user.data.candy2;
                break;
            case 3: 
                candy = user.data.candy3;
                break;       
            case 4: 
                candy = user.data.candy4;
                break;              
        }

        return candy;
    }

    async updateCandy(args, user) {
        switch(args.candy) {
            case 1:
                await this.db.candy1(user.data.id)     
                user.data.candy1 = 1;
                break;
            case 2: 
                await this.db.candy2(user.data.id)    
                user.data.candy2 = 1;
                break;
            case 3: 
                await this.db.candy3(user.data.id)   
                user.data.candy3 = 1; 
                break;       
            case 4: 
                await this.db.candy4(user.data.id)    
                user.data.candy4 = 1;
                break;              
        }
        return user;
    }

    sendPosition(args, user) {
        user.x = args.x
        user.y = args.y
        user.frame = 1

        user.room.send(user, 'send_position', { id: user.data.id, x: args.x, y: args.y })
    }

    sendFrame(args, user) {
        if (args.set) {
            user.frame = args.frame
        } else {
            user.frame = 1
        }

        user.room.send(user, 'send_frame', { id: user.data.id, frame: args.frame, set: args.set })
    }

    snowball(args, user) {
        user.room.send(user, 'snowball', { id: user.data.id, x: args.x, y: args.y })
    }

    async stampEarned(args, user) {
        args.stamp = parseInt(args.stamp)
        if (user.stamps.includes(args.stamp)) {
            return user.send('error', {
                error: 'You already have this stamp'
            })
        }
        let stamp = await user.stamps.add(args.stamp)
        if (!stamp) {
            return user.send('error', {
                error: 'Could not add stamp'
            })
        }
        user.send('stamp_earned', {
            stamp: args.stamp
        })
    }

    saveStampbook(args, user) {
        user.data.stampbookColor = args.color
        user.data.stampbookClasp = args.clasp
        user.data.stampbookPattern = args.pattern

        user.update({
            stampbookColor: user.data.stampbookColor,
            stampbookClasp: user.data.stampbookClasp,
            stampbookPattern: user.data.stampbookPattern
        })
    }

    async reportPlayer(args, user) {
        if (user.data.lastReport && ((new Date).getTime() - user.data.lastReport < 60000 * 5)) {
            let userName = (await this.db.getUserById(args.id)).username
            if (userName) {
                await this.discord.reportPlayer("duplicate", userName, args.id, user.data.username, user.data.lastReport, user.data.id)
            }
            this.fakeReports += 1;
            if (this.fakeReports >= 12) {
                let date = new Date()
                let expiry = date.getTime() + 86400000
                console.log()
                await this.db.ban(user.data.id, expiry, 2763)
                if (user) {
                    user.send('close_with_error', {error: 'You have been banned. Please make sure to follow the CPF rules.'})
                    user.close()
                }
            }
            return user.send("error", {error:"You may send another report in 5 minutes. However, if you keep spamming this function, expect moderators to take action on your account. If urgent, use Discord."})
        } else {
            this.fakeReports = 0;
        }

        let res = await this.db.updateLastReport(user.data.id)
        user.data.lastReport = res;
        let userName = (await this.db.getUserById(args.id)).username

        if (userName) {
            await this.discord.reportPlayer(args.reason, userName, args.id, user.data.username, user.data.lastReport)
        }
    }

}
