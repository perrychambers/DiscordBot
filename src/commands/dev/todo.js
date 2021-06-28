const { Client, Message, MessageEmbed } = require('discord.js')
const Schema = require('../../models/task')

module.exports = {
    name: 'todo',
    aliases: ['task', 'feature', 'request'],
    description: 'Adds a todo message to the database, can retrieve the current requests through the command !requests.',

    /**
     * 
     * @param {*} client 
     * @param {*} message 
     * @param {*} args 
     */
    run: async(client, message, args) => {
        // Does not need admin permissions, any user should be able to make a feature request.
        // !task <feature request>
        const request = args.join(" ")

        if(!request) return message.reply('Please add a message to this command.')

        // Create a new model to be saved to database
        const task = new Schema({
            Request: request,
            User: message.author
        })

        // insert message into database
        task.save()
            .then((result) => {
                console.log(result)
                message.reply('Developer task created. Thank you.')
            })
            .catch((err) => {
                console.log(err)
            })
        

        //message.reply('New feature request added.')
    }
}