module.exports = (client) => {
    console.log(`${client.user.tag} is ready at`)
    client.user.setStatus('idle')
    client.user.setActivity(`${client.prefix} help`, {type: "LISTENING"})
}