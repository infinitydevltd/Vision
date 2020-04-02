const { MessageEmbed, Message } = require('discord.js')
module.exports.run = async (client, message, args) => {
    if (!args[0] || isNaN(args[0]) || args[0] < 2 || args[0] > 100) return message.channel.send(`Please provide a **number** from \`2-100\``);
    const deleted = await message.channel.messages.fetch({ limit: args[0] });
    message.delete();
    message.channel.bulkDelete(deleted);
    return message.channel.send(new MessageEmbed().setDescription(`Deleted: \`${deleted.size}/${args[0]}\` messages.`).setColor(`DARK_RED`))
        .then(m => m.delete({ timeout: 10000 }));
}
module.exports.help = {
    name: 'purge',
    description: 'Purges messages',
    category: 'Administrator',
}
module.exports.requirements = {
    clientPerms: ["MANAGE_MESSAGES"],
    userPerms: ["MANAGE_MESSAGES"],
    ownerOnly: false
}