import { Client, Intents, GatewayIntentBits} from 'discord.js'
// import { report } from 'superagent'
const { EmbedBuilder, EmbedAssertions } = require("discord.js")

export default class Discord {

    constructor(config) {
        this.ready = false
        this.config = config
        const token = config.discordbottoken
        const dcbot = new Client({
            intents: GatewayIntentBits.Guilds
        });
        this.dcbot = dcbot
        this.dcbot.once('ready', () => {
            console.log('UPNewlands Discord Logging Ready!');
            this.ready = true
        });
        this.dcbot.login(token)
    }

    logChatMessage(username, message, room) {
        if (!this.ready) return
        
        // Code for time register (This depends on the PC time, where it gets current data)
        // Datetime will be used different in each log.

        var currentdate = new Date(); 
        var datetime = "Time sent: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

        // Embed Builder 

        const chatlog = new EmbedBuilder()
        .setTitle(`**Message Log 💬**`)
        .setDescription(`
        

        👤 \`\User:\`\ **${username}** - Sent a message in **${room}**

        ⌚ **(${datetime})**

        


        **✉️ \`\ Message content: \`\ ** ${message}


        `)
         .setColor('0x2d7d46')
         .setTimestamp()
         .setThumbnail(`https://media.discordapp.net/attachments/870486866699370546/1031420824718168164/unknown.png`)
         .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
         .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });


        const channel = this.dcbot.channels.cache.get(this.config.chatlogchannel)
        channel.send({embeds:[chatlog]})
    }

    logLogin(username) {
        if (!this.ready) return

        // Code for time register (This depends on the PC time, where it gets current data)
        // Datetime will be used different in each log.

        var currentdate = new Date(); 
        var datetime1 = "Loggin time: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

        // Embed Builder

        const loginnotification = new EmbedBuilder()
        .setTitle(`**Account Log-In 🔐**`)
        .setDescription(`
        

        👤 \`\ User:\`\  **${username}** - just logged into their account.

        ⌚ **(${datetime1})**

        

        `)
         .setColor('0x2d7d46')
         .setTimestamp()
         .setThumbnail(`https://media.discordapp.net/attachments/870486866699370545/1031431715991855186/unknown.png`)
         .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
         .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });

        
        const channel = this.dcbot.channels.cache.get(this.config.loginlogchannel)
        channel.send({embeds:[loginnotification]})
    }

    kickLogs(moderator, user, room) {
        if (!this.ready) return


        // Code for time register (This depends on the PC time, where it gets current data)
        // Datetime will be used different in each log.

        var currentdate = new Date(); 
        var datetime2 = "Kick Time: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

        // Embed Builder

        const kickeduser = new EmbedBuilder()
        .setTitle(`**Moderation Log. 🍃 (KICK)**`)
        .setDescription(`
        

        👤 \`\ User:\`\  **${user}** - has been kicked from the game.

        🔨 \`\ Moderator:\`\  **${moderator}

        🏢 \`\ Room:\`\  **${room}**

        ⌚ **(${datetime2})**

        

        `)
         .setColor('0xff1919')
         .setTimestamp()
         .setThumbnail(`https://cdn.discordapp.com/attachments/870486866699370545/1031434337897426965/unknown.png`)
         .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
         .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });
        

         const channel = this.dcbot.channels.cache.get('1030322110595334145') || this.dcbot.channels.fetch('1030322110595334145')
        channel.send({embeds:[kickeduser]})

    }

    banLogs(moderator, user, duration, expires) {
        if (!this.ready) return

        var currentdate = new Date(); 
        var datetime3 = "Ban time: " + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


             const banneduser = new EmbedBuilder()
            .setTitle(`**Moderation Log. 🍃 (BAN)**`)
            .setDescription(`
            

            👤 \`\ User:\`\  **${user}** - has been banned from the game.

            🔨 \`\ Moderator:\`\  **${moderator}**

            🏢 \`\ Ban time:\`\  ${duration}

            🏢 \`\ Until:\`\  ${expires}

            ⌚ **(${datetime3})**

            

            `)
             .setColor('0xff1919')
             .setTimestamp()
             .setThumbnail(`https://cdn.discordapp.com/attachments/870486866699370545/1031434337897426965/unknown.png`)
             .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
             .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });
            

        const channel = this.dcbot.channels.cache.get('1030322110595334145') || this.dcbot.channels.fetch('1030322110595334145')
        channel.send({embeds:[banneduser]})

    }

    addItemLogs(moderator, user, item) {
        if (!this.ready) return

        var currentdate = new Date(); 
        var datetime4 = "Action time: " + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


             const itemGive = new EmbedBuilder()
            .setTitle(`**Staff added an item. 📔**`)
            .setDescription(`
            

            👤 \`\ User:\`\  **${moderator}** - has added an item to themselves or a user.

            🔨 \`\ Item ID:\`\  ${item} 

            🏢 \`\ User:\`\  ${user} (If the user is the same as the mod, it was selfgiven.)

            ⌚ **(${datetime4})**

            

            `)
            .setColor('0x2d7d46')
             .setTimestamp()
             .setThumbnail(`https://media.discordapp.net/attachments/870486866699370545/1031587626798546964/unknown.png`)
             .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
             .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });
            

        const channel = this.dcbot.channels.cache.get('1030322110595334145') || this.dcbot.channels.fetch('1030322110595334145')
        channel.send({embeds:[itemGive]})

        // PLEASE MOODY, UPDATE THE METHOD FOR ${ITEM} IS NOT RETURNING PROPERLY SINCE THE VAR or PROPERTY IS UNDEFINED.

    }

    addCoinLogs(moderator, user, coins) {
        if (!this.ready) return

        
        var currentdate = new Date(); 
        var datetime = "Action time: " + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();


             const giveCoins = new EmbedBuilder()
            .setTitle(`**Staff has added coins 💰**`)
            .setDescription(`
            

           🔨  \`\Moderator:\`\ **${moderator}** - has added coinds to themselves or a user.
             
            💸 \`\ Amount:\`\  ${coins}

            🏢 \`\  User: \`\ ${user} (If the user is the same as the mod, it was selfgiven.)

            ⌚ **(${datetime})**

            

            `)
             .setColor('0x2d7d46')
             .setTimestamp()
             .setThumbnail(`https://media.discordapp.net/attachments/870486866699370545/1031569127359393894/unknown.png?width=868&height=633`)
             .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
             .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });
            

            const channel = this.dcbot.channels.cache.get('1030322110595334145') || this.dcbot.channels.fetch('1030322110595334145')
            channel.send({embeds:[giveCoins]})
    }

    changeUsernameLogs(moderator, oldname, newname) {
        if (!this.ready) return
        const channel = this.dcbot.channels.cache.get('1030322110595334145') || this.dcbot.channels.fetch('1030322110595334145')
        channel.send(`**MODERATOR:** ${moderator} **CHANGED THE USERNAME OF** ${oldname} **TO** ${newname}`);
    }

    async reportPlayer(reason, username, id, reporterUsername, lastReport=0, userID=0) {
        if (!this.ready) return
        const channel = this.dcbot.channels.cache.get("1028773615744864437")

        if (!this.fakeReports) {
            this.fakeReports = 0;
        }

        if (reason == "lang") {
            this.fakeReports = 0;

            var currentdate = new Date(); 
            var datetime = "Action time: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    
    
                 const newReport1 = new EmbedBuilder()
                 .setTitle(`**User report.**`)
                .setDescription(`
                
    
                👤  \`\ User:\`\ ${reporterUsername} made a report.
    
               🔨  \`\Reported user:\`\ **${username}**
                 
               🚗 \`\ Reason: \`\  **(FOR INAPPROPRIATE LANGUAGE)**
    
                ⌚ **(${datetime})**
    
                
    
                `)
                 .setColor('0x2d7d46')
                 .setTimestamp()
                 .setThumbnail(`https://media.discordapp.net/attachments/870486866699370545/1031569127359393894/unknown.png?width=868&height=633`)
                 .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
                 .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });
                
    
            channel.send({embeds:[newReport1]})

        }
        else if (reason == "name") {
            this.fakeReports = 0;


            var currentdate = new Date(); 
            var datetime = "Action time: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    
    
                 const newReport2 = new EmbedBuilder()
                .setTitle(`**User report.**`)
                .setDescription(`
                
    
                👤  \`\ User:\`\ ${reporterUsername} made a report.
    
               🔨  \`\Reported user:\`\ **${username}**
                 
               🚗 \`\ Reason: \`\  **(FOR HAVING AN INAPPROPIATE USERNAME)**
    
                ⌚ **(${datetime})**
    
                
    
                `)
                 .setColor('0x2d7d46')
                 .setTimestamp()
                 .setThumbnail(`https://media.discordapp.net/attachments/870486866699370545/1031569127359393894/unknown.png?width=868&height=633`)
                 .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
                 .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });
                
    
            channel.send({embeds:[newReport2]})

        }
        else if (reason == "igloo") {
            this.fakeReports = 0;


            var currentdate = new Date(); 
            var datetime = "Action time: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    
    
                 const newReport3 = new EmbedBuilder()
                .setTitle(`**User report.**`)
                .setDescription(`
                
    
                👤  \`\ User:\`\ ${reporterUsername} made a report.
    
               🔨  \`\Reported user:\`\ **${username}**
                 
               🚗 \`\ Reason: \`\  **(FOR HAVING AN INAPPROPIATE IGLOO)**
    
                ⌚ **(${datetime})**
    
                
    
                `)
                 .setColor('0x2d7d46')
                 .setTimestamp()
                 .setThumbnail(`https://media.discordapp.net/attachments/870486866699370545/1031569127359393894/unknown.png?width=868&height=633`)
                 .setAuthor({ name: 'UPN in-game.', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633', url: 'https://upnewlands.me' })
                 .setFooter({ text: 'UPN-Logs System', iconURL: 'https://media.discordapp.net/attachments/987682421904408586/1031425496837263360/39d629cbd9884e468a7d4a0166278536.jpeg?width=633&height=633' });
                
    
            channel.send({embeds:[newReport3]})

        } else if (reason == "duplicate") {
            let seconds = (new Date).getTime() - lastReport
            seconds = this.msToTime(seconds)
            if (this.fakeReports == 0) {
                this.fakeReports += 1;
                (this.msg = await channel.send(`**USER:** ${reporterUsername} attempted to send a report while they were ratelimited from their last report.\n*If they continue spamming this function, please feel free to take moderator action against their account.*\n\nLast report w/o ratelimit was **${seconds} ago** and they have spammed this function **${this.fakeReports} times**.`))
                return this.fakeReports
            } else {
                this.fakeReports += 1;
                if (this.fakeReports >= 12) {
                    let date = new Date()
                    let expiry = date.getTime() + 86400000
                    this.msg.edit(`**USER:** ${reporterUsername} attempted to send a report while they were ratelimited from their last report.\n*If they continue spamming this function, please feel free to take moderator action against their account.*\n\nLast report w/o ratelimit was **${seconds} ago** and they have spammed this function **${this.fakeReports} times**.\n\n\n**The user has been banned for spamming too much**.`)
                    return this.fakeReports
                }
                this.msg.edit(`**USER:** ${reporterUsername} attempted to send a report while they were ratelimited from their last report.\n*If they continue spamming this function, please feel free to take moderator action against their account.*\n\nLast report w/o ratelimit was **${seconds} ago** and they have spammed this function **${this.fakeReports} times**.`)
                return this.fakeReports
            }
        }
    }

    msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        // var hrs = (s - mins) / 60;
      
        return `${mins} minutes and ${secs} seconds`
      }

    errorAlert(error) {
        if (!this.ready) return
        //999483558794105023
        const channel = this.dcbot.channels.cache.get("1028774397156278413")
        channel.send(`**ERROR:** ${error} **REPORTED**`);
    } 
}