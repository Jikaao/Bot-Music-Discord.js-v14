module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    await interaction.deferUpdate()
    if (queue.size < 3) return await client.say.wrong(interaction, "Queue is too short to shuffle.\nLa file d'attente est trop courte pour être mélangée.");
    await queue.tracks.shuffle();
    return await client.say.success(interaction, "Shuffled tracks.\nLa file d'attente a été mélangé.")
}