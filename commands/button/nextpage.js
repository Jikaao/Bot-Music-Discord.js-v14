const { queue_embed } = require("../../utils/embeds")

module.exports = async (interaction, client) => {
    const [boolean, queue] = await client.checked.checkQueue(interaction)
    if (!boolean) return await interaction.reply(queue)
    if (!queue.size) return await interaction.reply({ ephemeral: true, content: "There is no queue to display.\nIl n'y a aucune file d'attente à afficher." })
    const page = Number(interaction.message.embeds[0].author.name.substring(4)) + 1;
    await interaction.update({ embeds: [queue_embed(interaction, queue, 10, page)] })
}