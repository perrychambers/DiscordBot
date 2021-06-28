const mongoose = require('mongoose')
const { Client, Message, MessageEmbed} = require('discord.js')
const Schema  = require('../../models/task')
const channelId = '847239968119455836'
const inProgress = '⚙️'
const bugged = '🐛'
const implemented = '☑️'
let registered = false

async function addReactions(todoMessage) {
    try {
        await todoMessage.react(inProgress)
        await todoMessage.react(bugged)
        await todoMessage.react(implemented)
    } catch (error) {
        console.error('One or more of the emojis failed to react.', error);
    }
}

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
        var embed
        // No arguments expected

        // Retrieve all tasks from database
        Schema.find()
            .then((result) => {
                for (message in result) {
                    embed = new MessageEmbed()
                    .setTitle('Feature Request: ')
                    .addFields(
                        { name: 'Task', value: result[message].Request},
                        { name: 'Requested By:', value: result[message].User}
                    )
                    .setFooter(`Requested at: ${result[message].createdAt}`)
                    channel.send()
                }
 

            })
            .catch((error) => {
                console.log(error)
            })


    }
}