module.exports = {
    commands: 'ping',
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply('Pong')
    }
}

