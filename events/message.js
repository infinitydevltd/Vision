const { owners, prefix } = require("../config")
const { MessageEmbed } = require("discord.js")

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === "dm") return;
    let args = message.content.slice(client.prefix.length + 1).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (!message.content.startsWith(client.prefix)) return;
    let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    // if (commandfile) commandfile.run(client, message, args)

    if (commandfile.requirements.ownerOnly && !owners.includes(message.author.id)) return message.channel.send("Sorry, you must be the bot owner to use this command")
    let result = missingPerms(message.member, commandfile.requirements.userPerms)

    if (commandfile.requirements.userPerms && !message.member.permissions.has(commandfile.requirements.userPerms)) return message.channel.send(`Sorry, you must have ${result} perms to run this command`)
    result = missingPerms(message.guild.me, commandfile.requirements.clientPerms) // `Sorry, you must have ${result} perms to run this command`
    if (commandfile.requirements.clientPerms && !message.guild.me.permissions.has(commandfile.requirements.clientPerms)) return message.channel.send(`Sorry, i must have ${result} perms to run this command`)
    commandfile.run(client, message, args)
}
const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(w))/g, char => char.toUpperCase())}\``)

    return missingPerms.length > 1 ? `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` : missingPerms[0]
}