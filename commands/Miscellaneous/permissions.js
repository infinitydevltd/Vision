const { MessageEmbed, Message } = require('discord.js')
module.exports.run = (client, message, args) => {
    let embed = new MessageEmbed()
        .setDescription(`\`\`\`diff\n+ ${Object.keys(message.member.permissions.serialize()).join("\n+ ")}\`\`\``)
        .setColor(`GREEN`)
        .setAuthor(`${message.author.tag}'s permissions`, message.author.displayAvatarURL())
    message.channel.send(embed)
}
module.exports.help = {
    name: 'permissions',
    description: 'permissions',
    category: 'Miscellaneous',
}
module.exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}