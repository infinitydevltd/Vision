const { MessageEmbed, Message } = require('discord.js')
const { inspect } = require("util")
module.exports.run = (client, message, args) => {
    try {
        let toEval = args.join(" ")
        let evaluated = inspect(eval(toEval, { depth: 1 }));
        if (message.content.includes('token')) {
            evaluated = 'You mother fucking son of a bitch, i wont give my token';
        }
        let hrStart = process.hrtime()
        let hrDiff;
        hrDiff = process.hrtime(hrStart);
        //               let inputembed = new RichEmbed()
        // .setColor("GREEN")
        // .setDescription(`:inbox_tray: Input:\n\`\`\`js\n${toEval}\`\`\`\n:outbox_tray: Output:\n**Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.**\n\`\`\`javascript\n${evaluated}\n\`\`\`\nType Of:\`\`\`${typeof(evaluated)}\n\`\`\``, { maxLength: 2048 })
        return message.channel.send(`Output:\n**Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.**\n\`\`\`javascript\n${evaluated.substring(0, 1900)}\`\`\``)

    } catch (e) {
        return message.channel.send(`Error while evaluating: \`${e.message}\``);
    }

}
module.exports.help = {
    name: "eval",
    description: "Evaluates a code",
    aliases: ["e"],
    category: "Developer"
}
module.exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: true
}