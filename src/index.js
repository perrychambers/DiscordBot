require('dotenv').config();

// create an instance of the discord bot for the server
const Discord = require('discord.js')
const client = new Discord.Client({ partials: ["Message", "CHANNEL", "REACTION"]});

const config = require('./config.json')
const path = require('path')
const fs = require('fs')
const roleClaim = require('./Reactions/roleClaim')

// Register bot using bot token
client.login(process.env.BOT_TOKEN)

// Sends a message when the client is connected
client.on('ready', () => {
    console.log(`The bot has been connected with username: ${client.user.username}`);

    const baseFile = 'command-base.js'
    const commandBase = require(`./CommandModules/${baseFile}`)

    const readCommands = dir => {
        // read all files inside of the CommandModules directory
        const files = fs.readdirSync(path.join(__dirname, dir))
    
        for(const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file)) 
            if(stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                //console.log(file, option)
                commandBase(client, option)
            }
        }
        
    }

    readCommands('CommandModules')

});

