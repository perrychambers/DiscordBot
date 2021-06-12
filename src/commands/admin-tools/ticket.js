const { MessageEmbed } = require('discord.js')

const channelId = '844038729966682115'
const close = '❌'
let registered = false

const registerReact = (client, ticketEmbed) => {
    if (registered) {
        return
    }

    registered = true

    console.log('REGISTERING EVENTS')

    client.on('messageReactionAdd', (reaction, user) => {
        if(user.bot)
            return

        console.log('HANDLING REACTION')
        const { message } = reaction
        if(message.channel.id === channelId) {
            message.delete(ticketEmbed)
        }
    })
}

module.exports = {
    name: 'ticket',
    aliases: ['t', 'help'],
    description: 'allows the user to create a support ticket for administrators.',
    run: async(client, message, args, userMessage) => {
        const {guild, member} = message
        const text = args[0]

        const ticketEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ticket')
            .setDescription(`A new support ticket has been created by <@${member.id}>`)
            .addFields(
                 {name: 'Description:', value: `${text}`},
                 {name: 'How to close this ticket:', value: `Click the ${close} icon to close this ticket.`}
            )

        registerReact(client, ticketEmbed)

        const channel = guild.channels.cache.get(channelId)
        channel.send(ticketEmbed)
        .then((ticketMessage) => {
            ticketMessage.react(close)

            userMessage.reply('Your support ticket has been added.')
            userMessage.delete()
        })

    }

}