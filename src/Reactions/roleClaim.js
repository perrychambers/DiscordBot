const channelId = '847240305924767744'
const messageId = '852357745318821928'
const Discord = require('discord.js')

const gamingEmojiId = '852354989954695169'
const programmingEmojiId = '852354934849404939'

module.exports = (client) => {

    reactionManager = new Discord.MessageReactionAdd(client, messageId);

    console.log(reactionManager.fetch());

    client.on('messageReactionAdd', (reaction, user) => { 
        if(!user.bot) {
            if(message.reaction.id === gamingEmojiId) {
                message.send('gaming')
            }
        }

    })
}
