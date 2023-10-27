module.exports = async(interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    await interaction.deferUpdate()
    await queue.node.seek(0);
    return await client.say.success(interaction, "Play the current song from the beginning.\nRemet la musique en cours au début.")
}