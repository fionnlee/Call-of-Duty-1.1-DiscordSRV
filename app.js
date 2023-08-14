const { Client, GatewayIntentBits, WebhookClient, Util } = require("discord.js");
const bot = new Client({intents: [ GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, ], ws: { properties: { browser: 'Discord iOS' } },});
const fs = require('fs');
const RCON = require('quake3-rcon');
const Tail = require('tail').Tail;
const {Webhook_ID, Webhook_Token, Banlist_Path} = require('./config.json')
const tail = new Tail("/home/ubuntu/sd/main/game_mp.log", "\n", {}, true);
const rcon = new RCON({ address: '', port: 20600, password: '' });

bot.on("ready", () => { 
    console.log("BoT Online!")
    read_gamelog(bot);
});

bot.on('messageCreate', async (message)  => {
    if (message.author.bot) return;
    if (message.channel.id === '1129299969787035688') {
        rcon.send('say ^5[Discord]^7' + message.author.username + '^3: ^7' + message.content, (response) => {
            console.log(message.author.username + ': ' + message.content);
        });
    }
});

function read_gamelog(bot) {
    tail.on('line', async line => {
        const chat = line.split(':');
        const find = chat[1].split(' ');
        if (find[1] == "say") {
            if (chat.length == 4) {
                console.log(chat[2] + ": " + chat[3]);
                msg = chat[3].replace("@everyone", "");
                msg = msg.replace("@here", "");
                    
                user = chat[2].replace("^0", "");
                user = user.replace("^1", "");
                user = user.replace("^2", "");
                user = user.replace("^3", "");
                user = user.replace("^4", "");
                user = user.replace("^5", "");
                user = user.replace("^6", "");
                user = user.replace("^7", "");
                user = user.replace("^8", "");
                user = user.replace("^9", "");
                    
                bot.channels.fetch('1129299969787035688')
                .then(channel => {
                    channel.send("**" + user + "**" + ": " + msg);
                })
                    
            }
            else if (chat.length == 5) {
                console.log(chat[2] + ": " + chat[3]);
                msg = chat[3].replace("@everyone", "");
                msg = msg.replace("@here", "");
                    
                user = chat[2].replace("^0", "");
                user = user.replace("^1", "");
                user = user.replace("^2", "");
                user = user.replace("^3", "");
                user = user.replace("^4", "");
                user = user.replace("^5", "");
                user = user.replace("^6", "");
                user = user.replace("^7", "");
                user = user.replace("^8", "");
                user = user.replace("^9", "");
                    
                bot.channels.fetch('1129299969787035688')
                .then(channel => {
                     channel.send("**" + user + "**" + ": " + msg);
                })
            }
        }

    });
}

bot.login();
