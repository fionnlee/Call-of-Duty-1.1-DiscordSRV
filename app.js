//Bot start
const { Client, GatewayIntentBits, WebhookClient, Util, EmbedBuilder } = require("discord.js");
const bot = new Client({intents: [ GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, ], ws: { properties: { browser: 'Discord iOS' } },});
const fs = require('fs');
const RCON = require('quake3-rcon');
const Tail = require('tail').Tail;

const {SERVER_IP, SERVER_PORT, SERVER_RCONPASS, SERVER_GAMELOG_PATH, CHANNEL_ID, BOT_TOKEN} = require('./config.json');
const { constants } = require("buffer");
const tail = new Tail(SERVER_GAMELOG_PATH, "\n", {}, true);
const rcon = new RCON({ address: SERVER_IP, port: SERVER_PORT, password: SERVER_RCONPASS });
const ban_words = {"@everyone":"", "@here":""}; //ban word from message

const players = []

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
        const jq = line.split(';');
        const jqfind = jq[0].split(' ');
        const jqfindjq = jqfind[0].split(':');
        const jqfindim = jqfindjq[1].split('');
        const find = chat[1].split(' ');
        const findim = find[0].split('');
        //Cod Praser sometimes has bugs with player names.
        if (find[1] == "say" || (findim[2] == "s" && findim[3] == "a" && findim[4] == "y")) {
            if (chat.length == 4) {
                console.log(chat[2] + ": " + chat[3]);
                //prevent evenyone and here ping
                Object.keys(ban_words).forEach((key) => {
                    msg = chat[3].replaceAll(key, ban_words[key]);
                });
                //remove the color code from the player name
                user = chat[2].replace('^0',' ').replace('^1','').replace('^2','').replace('^3','').replace('^4','').replace('^5','').replace('^6','').replace('^7','');

                bot.channels.fetch(CHANNEL_ID)
                .then(channel => {
                    channel.send("**" + user + "**" + " : " + msg);
                })  
            }
            
        }
        else if(jqfind[1] == "J" || (jqfindim[2] == "J")){
            if(!players.includes(jq[2])){
                players.push(jq[2])
                //replace color code
                user = jq[2].replace('^0',' ').replace('^1','').replace('^2','').replace('^3','').replace('^4','').replace('^5','').replace('^6','').replace('^7','');
                
                const embed = new EmbedBuilder()
                .setAuthor({
                  name: user + " joined the server",
                  iconURL: "https://media.discordapp.net/attachments/866353111244865576/1140862728660066394/6910-awww.png",
                })
                .setColor("#00f549")
                .setTimestamp();
                
                bot.channels.fetch(CHANNEL_ID)
                .then(channel => {
                    channel.send({ embeds: [embed] });
                }) 
            }

        }

        else if(jqfind[1] == "Q" || (jqfindim[2] == "Q")){
            if(players.includes(jq[2])){
                const index = players.indexOf(jq[2]);
                if (index > -1) { 
                    players.splice(index, 1);
                }
                //replace color code
                user = jq[2].replace('^0',' ').replace('^1','').replace('^2','').replace('^3','').replace('^4','').replace('^5','').replace('^6','').replace('^7','');
                const embed = new EmbedBuilder()
                .setAuthor({
                  name: user + " left the server",
                  iconURL: "https://cdn.discordapp.com/attachments/866353111244865576/1140862845798592615/8727-cryig.png",
                })
                .setColor("#f50000")
                .setTimestamp();
                
                bot.channels.fetch(CHANNEL_ID)
                .then(channel => {
                    channel.send({ embeds: [embed] });
                }) 
            }

        }

    });
}

bot.login(BOT_TOKEN);
