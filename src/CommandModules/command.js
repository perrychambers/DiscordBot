/**
 * Simple Command Handler for index.js file
 * Method is called as: command(client, 'commandString', (message) => {message.channel.send('whatever)}
 * @Param {commandString: command to be ran by the user}
 */

const { prefix } = require('../config.json')

// aliases are for calling the same command with a different name/alias
module.exports = (client, aliases, callback) => {
    if(typeof aliases === 'string') {
        aliases = [aliases]
    }

    client.on('message', message => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`

            if(content.startsWith(`${command }`) || content === command) {
                console.log(`Running the command ${command}`)
                callback(message)
            }
        });
    })
}