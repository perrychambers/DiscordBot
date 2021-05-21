const fetch = require('node-fetch')
// use "npm i node-fetch --save" to install

module.exports = {
    commands: ['cat', 'randomcat'],
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => message.reply(data[0].url))
    }
}