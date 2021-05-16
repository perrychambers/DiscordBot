const firstMessage = require('../firstMessage')

module.exports = (client) => {
    const channelId = '842827078722125844'

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === key)

    const emojis = {
        javascript: 'JavaScript',
        java: 'Java'
    }

    const reactions = []

    let emojiText = 'Add a reaction to claim a role\n\n'
    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }

    firstMessage(client, channelId, emojiText, [])

}