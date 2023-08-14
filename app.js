//Bot start
const { Client, GatewayIntentBits, WebhookClient, Util } = require("discord.js");
const bot = new Client({intents: [ GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, ], ws: { properties: { browser: 'Discord iOS' } },});
const fs = require('fs');
const RCON = require('quake3-rcon');
const Tail = require('tail').Tail;

const {SERVER_IP, SERVER_PORT, SERVER_RCONPASS, SERVER_GAMELOG_PATH, CHANNEL_ID, BOT_TOKEN} = require('./config.json')
const tail = new Tail(SERVER_GAMELOG_PATH, "\n", {}, true);
const rcon = new RCON({ address: SERVER_IP, port: SERVER_PORT, password: SERVER_RCONPASS });

bot.on("ready", () => { 
    console.log("CoD 1.1 DiscordSRV By Fionn")
    console.log("Contact: fionnlee#5322")
    read_gamelog(bot);
});

bot.on('messageCreate', async (message)  => {
    if (message.author.bot) return;
    if (message.channel.id === CHANNEL_ID) {
        rcon.send('say ^5[Discord]^7' + message.author.username + '^3: ^7' + message.content, (response) => {
            console.log(message.author.username + ': ' + message.content);
        });
    }
});
// Chat parser 
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
                    
                bot.channels.fetch(CHANNEL_ID)
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
                    
                bot.channels.fetch(CHANNEL_ID)
                .then(channel => {
                     channel.send("**" + user + "**" + ": " + msg);
                })
            }
        }

    });
}

bot.login(BOT_TOKEN);
