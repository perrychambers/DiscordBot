const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs')
const prefix = require('../../config.json').prefix

module.exports = {
    name: 'help',
    aliases: ['commands', 'a'],
    description: 'Returns all loaded commands.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff"
        : message.guild.me.displayHexColor;

        if(!args[0]) {
            let categories = [];

            readdirSync("./commands/").forEach((dir) => {
                const commands = readdirSync(`./commands/${dir}/`).filter((file) => {
                    file.endsWith('.js')
                });

                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if(!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    return `\`${name}\``;
                });

                let data = new Object();

                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "In progress." : cmds.join(" "),
                };

                categories.push(data);
            });

            const embed = new MessageEmbed()
                .setTitle("All bot commands:")
                .addFields(categories)
                .setDescription(
                    `Use \${prefix}help\` followed by a command name to get information about a command. I.e., \`${prefix}help cat\`.`
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({dynamic: true})
                )
                .setTimestamp()
                .setColor(roleColor);
            return message.channel.send(embed);
        } else {
            const command = 
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if(!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid Command!. Use \`${prefix}help\` for all commands.`)
                    .setColor("FF0000")
                return message.channel.send(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField("PREFIX:", `\`${prefix}\``)
                .addField(
                    "COMMAND:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "ALIASES:",
                    command.aliases
                        ? `\`${command.aliases.join("` `")}\``
                        : "No aliases for this command."
                )
                .addField(
                    "USAGE:",
                    command.usage
                        ? `\`${prefix}${command.name} ${command.usage}\``
                        : `\`${prefix}${command.name}\``
                )
                .addField(
                    "DESCRIPTION:",
                    command.description
                        ? command.description
                        : "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({dynamic: true})
                )
                .setTimestamp()
                .setColor(roleColor);
            return message.channel.send(embed);
        }
    }
}