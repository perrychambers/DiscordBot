const discord = require("discord.js")

module.exports = {
        commands: 'todo',
        minArgs: 1,
        expectedArgs: '<message>',
        callback: (message, arguments, text, client) => {
            message.send('You have the correct permission.')
        },
        permissions: 'ADMINISTRATOR'
}