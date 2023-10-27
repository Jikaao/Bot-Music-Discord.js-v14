module.exports = async(interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    await interaction.deferUpdate()
    await queue.node.skip();
    return await client.say.success(interaction, "Skipped tracks.\nLa musique est skip.")
}