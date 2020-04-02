const { MessageEmbed, Message } = require('discord.js')
module.exports.run = (client, message, args) => {
    function resolveMember(member) {
        if (!member) return null;
        return message.guild.members.cache.get(member) || message.guild.members.cache.find(m => {
            let match = member.match(/<@!?(\d{17,19})>/);
            if (match && m.id === match[1]) return true;
            return m.displayName.toLowerCase().includes(member.toLowerCase()) || m.user.username.toLowerCase().includes(member.toLowerCase());
        });
    }
    let member = resolveMember(args[0]) || client.users.cache.get(args[0]) || message.member;
    message.channel.send(new MessageEmbed().setAuthor(`${member.user.tag}'s Avatar`).setImage(member.user.displayAvatarURL({ size: 2048, dynamic: true })))
}
module.exports.help = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    description: "Shows someone's avatar",
    category: 'Miscellaneous',
}
module.exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}