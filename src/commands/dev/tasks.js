const mongoose = require('mongoose')
const { Client, Message, MessageEmbed} = require('discord.js')
const Schema  = require('../../models/task')
const channelId = '847239968119455836'

module.exports = {
    name: 'tasks',
    description: 'Retrieves a list of all current tasks.',

    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) {
            message.reply('You must be an administrator to run this command.')
            return
        }

        const {guild, member} = message
        const channel = guild.channels.cache.get(channelId)

        // No arguments expected

        // Retrieve all tasks from database
        Schema.find()
            .then((result) => {
                for (message in result) {
                    channel.send(new MessageEmbed()
                    .setTitle('Feature Request: ')
                    .addFields(
                        { name: 'Task', value: result[message].Request},
                        { name: 'Requested By:', value: result[message].User}
                    )
                    .setFooter(`Requested at: ${result[message].createdAt}`)
                )
                }
 

            })
            .catch((error) => {
                console.log(error)
            })

    }
}