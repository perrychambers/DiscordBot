require('dotenv').config();

const {Collection, Client, Discord} = require('discord.js')
const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"]
});

module.exports = client; 

const config = require('./config.json')
//const path = require('path')
const fs = require('fs')

const prefix = config.prefix
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('commands/');
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
})



// Connect to mongoDB database
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://chambersbot:admin@cluster0.x5qpj.mongodb.net/discord?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('Connected to mongo db.'))

// Sends a message when the client is connected
client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} successfully connected. ✅`)
});

// listen for command messages
client.on('message', async message => {
    if(message.author.bot) return;  // if bot sends a command
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)
})

// Register bot using bot token
client.login(process.env.BOT_TOKEN)

