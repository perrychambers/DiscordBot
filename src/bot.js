require('dotenv').config();

// Create an instance of the bot to interact with the server
const { Client } = require('discord.js');
const client = new Client();

// Register bot using bot token
client.login(process.env.BOT_TOKEN)

// Sends a message when the client is connected
client.on('ready', () => {
    console.log(`The bot has been connected with username: ${client.user.username}`);
});

/* Message function
params: 
message: message any user sends in any channel
data: any data required for the message
channel: set a specific channel to listen to

Can set up commands like this, may be a better way but
this works for now.
*/

client.on('message', (message) => {
    console.log(`[${message.author.tag}] : ${message.content}`)
    if(message.content === 'test') {
        message.channel.send('Test response');
    }
});