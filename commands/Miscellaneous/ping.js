module.exports.run = (client, message) => {
    message.channel.send(`Ping Pong!, \`${client.ws.ping.toFixed(2)}\`ms`)
}

module.exports.help = {
    name: "ping",
    description: "Checks the ping",
    category: "Miscellaneous"
}

module.exports.requirements = {
    clientPerms: [],
    userPerms: [],
    ownerOnly: false
}