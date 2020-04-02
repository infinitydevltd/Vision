const { token, prefix } = require("./config")
const { Client, Collection } = require("discord.js")

const client = new Client({
    disableEveryone: true,
    disabledEvents: ["TYPING_START"]
})

client.prefix = prefix;
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Map();
client.esnipes = new Map();

const commands = require("./structures/command")
commands.run(client)

const events = require("./structures/event")
events.run(client)

client.login(token)