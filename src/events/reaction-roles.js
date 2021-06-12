const client = require('../index')
const Schema = require('../models/reaction-roles')

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    Schema.findOne({Message: reaction.message.id}, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name))  //check for reaction name

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.add(roleid)

        user.send('You have obtained a role')
    })
    
})

client.on('messageReactionRemove', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    Schema.findOne({Message: reaction.message.id}, async(err, data) => {
        if(!data) return;
        if(!Object.keys(data.Roles).includes(reaction.emoji.name))  //check for reaction name

        const [ roleid ] = data.Roles[reaction.emoji.name];
        reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)

        user.send('You have lost a role.')
    })
    
})