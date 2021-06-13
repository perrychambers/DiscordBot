const { Client, Message, MessageEmbed, Util } = require('discord.js');
const Schema = require("../../models/reaction-roles")

module.exports = {
    name: 'panel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return;
 
        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({Guild: message.guild.id}, async(err, data) => {
            if(!data) {
                return message.reply('No data was located.')
            }
            const mapped = Object.keys(data.Roles)
                .map((value, index) => {
                    const role = message.guild.roles.cache.get(data.Roles[value][0]);
                    return `${index + 1}: ${data.Roles[value][1].raw} - ${role}`
                }).join('\n\n')

            channel.send(new MessageEmbed().setTitle('Please react to the respective emoji below to gain access to their channels.').setDescription(mapped)).then((msg) => {
                data.Message = msg.id;
                data.save();

                const reactions = Object.values(data.Roles).map((val) => val[1].id ?? val[1].raw)
                reactions.map((emoji) => msg.react(emoji))
            })
        })
    }
}