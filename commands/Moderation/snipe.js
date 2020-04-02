const { MessageEmbed, Message } = require('discord.js')

module.exports.run = (client, message, args) => {
    //    let channel = message.mentions.channels.cache.first() ? message.mentions.channels.cache.first() : message.channel;
    let sniped = client.snipes.get(message.channel.id)
    let embed = new MessageEmbed()
        .setColor(`DARK_RED`)
        .setAuthor(`Deleted Message`)
        .setDescription(`Message Author: ${sniped.author.tag}\nMessage Content: \`\`\`${sniped.content.substring(0, 1900)}\`\`\``)
    if (sniped.image) embed.setImage(msg.image)
    message.channel.send(embed)
    if (!sniped) embed.setDescription(`There is no recently deleted messages`)
}
module.exports.help = {
    name: "snipe",
    description: "Shows the recently deleted message or image",
    aliases: [],
    category: "Moderation"
}

module.exports.requirements = {
    clientPerms: [],
    userPerms: ["MANAGE_MESSAGES"],
    ownerOnly: false
}