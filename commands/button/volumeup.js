module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    await interaction.deferUpdate();
    const volume = queue.node.volume;
    if (volume > 198) return
    await queue.node.setVolume(volume + 2)
    await client.say.success(interaction, `Le volume a été augmenté. Volume actuel: ${String(volume+2)}\nLe volume a été augmenté. Volume actuel: ${String(volume+2)}`)
}