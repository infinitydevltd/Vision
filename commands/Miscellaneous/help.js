const { MessageEmbed, Message } = require('discord.js')
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")

module.exports.run = (client, message, args) => {
    // if(args[0] && client.commands.has(args[0])){
    //     const cmd = client.commands.get(args[0])
    //     const mcdhelp = new MessageEmbed()
    //     .setAuthor(`Help | ${cmd.help.name}`, client.user.displayAvatarURL())
    //     .addField(`**Name:**`, cmd.help.name)
    //     .addField(`**Description:**`, cmd.help.description)
    //     .setColor("RED")

    // return message.channel.send(mcdhelp)
    // }
    const embed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(`Help Menu | Commands`, message.guild.iconURL())
        .setThumbnail(client.user.displayAvatarURL())

    if (!args[0]) {
        const categories = readdirSync("./commands/")

        embed.setDescription(`Any bug/suggestion must be reported here: [[Support Server]](https://discord.gg/DEWPug3)\nWonder why there is a moderation command in the category Administrator?\nWell Administrator cmds require more permissions`)
        embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL());

        categories.forEach(category => {
            const dir = client.commands.filter(c => c.help.category === category)
            const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
            try {
                embed.addField(`> ${capitalise} - (${dir.size}):`, dir.map(c => `\`${c.help.name ? c.help.name : "No Commands"}\``).join(", "))
            } catch (e) {
                console.log(e)
            }
        })
            .setThumbnail(client.user.displayAvatarURL())
        message.channel.send(embed)
        // message.channel.send(client.user.displayAvatarURL())
    } else {
        let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
        if (!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${client.prefix} help\` for the list of the commands.`))

        embed.setDescription(stripIndents`
        **Command:** ${command.help.name.slice(0, 1).toUpperCase() + command.help.name.slice(1)}
        **Description:** ${command.help.description || "No Description provided."}
        **Aliases:** ${command.help.aliases ? command.help.aliases.join(", ") : "None."}`)

        return message.channel.send(embed)
    }
}
module.exports.help = {
    name: "help",
    description: "Shows the help menu",
    aliases: [],
    category: "Miscellaneous"
}

module.exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}