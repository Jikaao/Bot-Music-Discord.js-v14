module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    await interaction.deferUpdate();
    const volume = queue.node.volume;
    if (volume < 2) return
    await queue.node.setVolume(volume -2)
    await client.say.success(interaction, `Volume down. Current volume: ${String(volume-2)}\nJ'ai baissé le volume. volume actuel: ${String(volume-2)}`)
}