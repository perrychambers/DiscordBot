const { Client, Message, MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'docs',
    aliases: ["discordjs"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.reply("Please specify a query!.");
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`

        const docFetch = await fetch(url);
        const embed = await docFetch.json();

        if(!embed || embed.error)
            message.reply(`Error handling query: ${query}.`)

        if(!message.guild) {
            return message.channel.send({embed})
        }
    }
}
