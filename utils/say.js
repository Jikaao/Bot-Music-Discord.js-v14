const { setTimeout } = require("timers/promises")

async function success(interaction, content) {
    try {
        const msg = await interaction.channel.send("```🟢 " + content + "```")
        await setTimeout(3000)
        await msg.delete()
    } catch { }
}

async function wrong(interaction, content) {
    try {
        const msg = await interaction.channel.send("```🟡 " + content + "```")
        await setTimeout(3000)
        await msg.delete()
    } catch { }
}

async function error(interaction, content) {
    try {
        const msg = await interaction.channel.send("```🔴 " + content + "```")
        await setTimeout(3000)
        await msg.delete()
    } catch { }
}

module.exports = {
    success,
    wrong,
    error
}