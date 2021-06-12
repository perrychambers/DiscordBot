const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'cat',
    category: 'media',
    description: 'returns a random cat picture upon running command',

    /**
     * @param {*} client 
     * @param {*} message 
     * @param {*} args 
     */
    run: async (client, message, args) => {
        fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => message.reply(data[0].url))
    }
}