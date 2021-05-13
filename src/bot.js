/**  Message function
* @Param {message}: message any user sends in any channel
* @Param {data}: any data required for the message
* @Param {channel}: set a specific channel to listen to

Can set up commands like this, may be a better way but
this works for now.
*/
/*
client.on('message', (message) => {
    console.log(`[${message.author.tag}] : ${message.content}`)
    if(message.content === 'test') {
        message.channel.send('Test response');
    }
});

/** Create invite link on-demand
 * @Param {message}: message that any user sends in any channel
 * @Param {data}: any data required for the message
 * @Param {channel}: 
 */
/*
client.on('message', (message) => {
    if(message.content === 'invite') {
        client.generateInvite({permissions: ['SEND_MESSAGES']})
        .then(link => message.channel.send(link))
        .catch(console.error);

        console.log(`Command sent from: ${message.channel}`);

    }
})
*/