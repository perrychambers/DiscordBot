const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['purge'],
    description: 'Clears x amount of messages in the channel the command was sent in.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0])
            return message.channel.send('Please specify a number of messaged to delete in the range of 1-99')
        if(isNaN(args[0]))
            return message.channel.send('Not a number added.')
        if(parseInt(args[0] > 99 || args[0] < 1))
            return message.channel.send('Please enter a number in range: 1-99.')
        await message.channel.bulkDelete(parseInt(args[0]) + 1, true)
            .catch(err => console.log(err))
        message.channel.send('Deleted ' + args[0] + ' messages.').then(mes => mes.delete(3000)) .catch();
    }
}