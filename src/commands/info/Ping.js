const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'ping',
    category: 'info',
    description: 'Returns a ping mesage and latency',

    /**
     * @param {*} client 
     * @param {*} message 
     * @param {*} args 
     */
    run : async(client, message, args) => {
        const msg = await message.channel.send('Pinging.')
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`Ping is ${client.ws.ping}MS\n`)
            await message.channel.send(embed)
            msg.delete()
    }
}