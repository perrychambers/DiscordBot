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

    // this command includes a commandString and an alias
    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong');
    })

    // this command just includes a commandString
    command(client, 'deleteAll', (message) => {
        message.channel.send('Clearing messages.');
    })

    // Command to see how many members are in a server(Testing guild API)
    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            console.log(guild);
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`)
        })
    })

    /**
     * React with unicode emoji ID
     * or react with Escaped version \:emojiName:
     * If there are multiple emojis being reacted, can return out of order
     * solution: async function with await responses.
     * 
     * If order doesn't matter: Promise.all([array of reaction messages])
     */
    command(client, 'react', async (message) => {
        await message.react('🍎')
        await message.react('🍌')
        await message.react('🍆')
    })

});
