module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        console.log('Inside of ping command.')
        message.reply('Pong')
    }
}

