# Call-of-Duty-1.1-DiscordSRV
A Discord bot for linking Discord and servers for sharing chat.

## Setup

1. Install Nodejs `sudo apt-get install nodejs` (Tested with Nodejs v18)
2. Download a repository `git clone https://github.com/fionnlee/Call-of-Duty-1.1-DiscordSRV.git`
3. CD to path `cd Call-of-Duty-1.1-DiscordSR`
4. Install Discord.js `npm i discord.js --save`
5. Install quake3-rcon `npm i quake3-rcon --save`
6. Install Node-Tail `npm i tail --save`
7. Edit `config.json`
   ```c
      {
        "SERVER_IP": "1.1.1.1",
        "SERVER_PORT": 28960,
        "SERVER_RCONPASS": "rconpass",
        "SERVER_GAMELOG_PATH": "/path/to/game_mp.log",
        "CHANNEL_ID" : "11111111111222",
        "BOT_TOKEN" : "wdwdwdwwaad.wdddwdwd.wdddddddddddddddddd"
      }
   ```
8. Run the bot with the following command `node app.js`

## Enjoy.
