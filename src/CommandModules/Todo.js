const discord = require("discord.js")

const channelId = '847239968119455836'
const inProgress = '⚙️'
const bugged = '🐛'
const implemented = '☑️'
let registered = false

const registerReact = (client, todoEmbed) => {
    if (registered) {
        return
    }

    registered = true

    client.on('messageReactionAdd', (reaction, user) => {
        if(user.bot)
            return
            
        // handle reaction    
        const { message } = reaction

        //console.log(reaction._emoji)
    
        const receivedEmbeds = message.embeds[0]

        if(message.channel.id === channelId) {
            if(reaction._emoji.name === '⚙️') {
               const updateEmbed = new discord.MessageEmbed(receivedEmbeds)
                .addFields(
                    { name: 'inProgress', value: `Task in progress by ${user}`}
                )

                message.edit(updateEmbed)
            }
            else if (reaction._emoji.name === '🐛') {
                const buggedEmbed = new discord.MessageEmbed(receivedEmbeds)
                .addFields(
                    { name: 'bugged', value: `Task reported bugged by ${user}`}
                )

                message.edit(buggedEmbed)
            } else if (reaction._emoji.name === '☑️') {
                message.delete(todoEmbed)
            }

        }

    })
}

async function addReactions(todoMessage)  {
    try {
        await todoMessage.react(inProgress)
        await todoMessage.react(bugged)
        await todoMessage.react(implemented)
    } catch (error) {
        console.error('One or more of the emojis failed to react.', error);
    }
}

module.exports = {
        commands: ['todo', 'feature', 'new'],
        minArgs: 1,
        expectedArgs: '<message>',
        callback: (userMessage, arguments, text, client) => {
            const {guild, member} = userMessage

            const todoEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Task')
            .setDescription(`${text}`)
    
    
            registerReact(client, todoEmbed)

        const channel = guild.channels.cache.get(channelId)
            channel.send(todoEmbed)
            .then((todoMessage) => {
                addReactions(todoMessage)
  
                userMessage.reply('Your feature task ticket has been added.')
                userMessage.delete()
            })
        },
}