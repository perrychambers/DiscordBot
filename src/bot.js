require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
    console.log(`The bot has been connected with username: ${client.user.username}`);
});

client.on('message', (message) => {
    console.log(`[${message.author.tag}] : ${message.content}`)
    if(message.content === 'test') {
        message.channel.send('Test response');
    }
});

client.login(process.env.BOT_TOKEN)