const { readdirSync } = require("fs")
const { join } = require("path")
const filePath = join(__dirname, "..", "commands")
module.exports.run = (client) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            client.commands.set(pull.help.name, pull);
            if (pull.help.aliases) pull.help.aliases.forEach(a => client.aliases.set(a, pull.help.name));
          };
        };
        ["miscellaneous", "moderation", "administrator", "developer"].forEach(x => load(x));
        console.log(`Loaded ${client.commands.size} cmds!`)
    }