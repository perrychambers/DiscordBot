const channelId = '844038729966682115'
const close = '❌'
let registered = false


const registerReact = (client) => {
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
            message.delete()
        }
    })
}


module.exports = {
    commands: ['ticket', 'support'],
    minArgs: 1,
    expectedArgs: '<message>',
    callback: (userMessage, arguments, text, client) => {
        const {guild, member} = userMessage

        registerReact(client)

        const channel = guild.channels.cache.get(channelId)
        channel.send(`A new ticket has been created by <@${member.id}>
        
            "${text}"
            
            
        Click the ${close} icon to close this ticket.`)
        .then((ticketMessage) => {
            ticketMessage.react(close)

            userMessage.reply('Your ticket has been added.')
            userMessage.delete()
        })

    },
}