require('dotenv').config();

// create an instance of the discord bot for the server
const Discord = require('discord.js')
const client = new Discord.Client();

const config = require('./config.json')
const command = require('./CommandModules/command')

// Register bot using bot token
client.login(process.env.BOT_TOKEN)

// Sends a message when the client is connected
client.on('ready', () => {
    console.log(`The bot has been connected with username: ${client.user.username}`);

    command(client, 'ping', (message) => {
        message.channel.send('Pong');
    })

    command(client, 'deleteAll', (message) => {
        message.channel.send('Clearing messages.');
    })
});
