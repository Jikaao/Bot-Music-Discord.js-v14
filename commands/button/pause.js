const { panelbuttons_2 } = require("../../utils/buttons")

module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    if (queue.node.isPaused()) {
        await interaction.deferUpdate()
        return await client.say.wrong(interaction, "It has already been suspended.\nDéjà mis en pause?")
    }
    await queue.node.pause()
    await interaction.update({
        components: panelbuttons_2()
    });
    return await client.say.success(interaction, "Paused.\n一Le temps s'est arrêté.")
}