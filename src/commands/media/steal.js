const { Client, Message, Util } = require('discord.js')

module.exports = {
    name: 'steal-emoji',
    description: 'Copies an emoji from another discord server and adds it to this one. Must have Nitro.',
    run: async(client, message, args) => {
        if(!args.length) return message.reply('Please add 1 or more emojis.');

        for(const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji)

            if(parsedEmoji.id) {
                // gif or ping
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``))
            }
        }
    }
}