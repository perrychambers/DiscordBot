require('dotenv').config();
const {Collection, Client, Discord} = require('discord.js')
const client = new Client({
    partials: ["Message", "CHANNEL", "REACTION"]
});

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


// Sends a message when the client is connected
client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} successfully connected. ✅`)
    // console.log(`The bot has been connected with username: ${client.user.username}`);

    // const baseFile = 'command-base.js'
    // const commandBase = require(`./Commands/${baseFile}`)

    // const readCommands = dir => {
    //     // read all files inside of the CommandModules directory
    //     const files = fs.readdirSync(path.join(__dirname, dir))
    
    //     for(const file of files) {
    //         const stat = fs.lstatSync(path.join(__dirname, dir, file)) 
    //         if(stat.isDirectory()) {
    //             readCommands(path.join(dir, file))
    //         } else if (file !== baseFile) {
    //             const option = require(path.join(__dirname, dir, file))
    //             //console.log(file, option)
    //             commandBase(client, option)
    //         }
    //     }
        
    // }

    // readCommands('Commands')
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

