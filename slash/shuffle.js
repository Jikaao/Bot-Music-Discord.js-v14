const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("aléatoire").setDescription("Melange les musiques de la liste d'attente"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Il n'y a aucune musique dans la file d'attente")

		queue.shuffle()
        await interaction.editReply(`La liste de ${queue.tracks.length} musiques a bien été mélangé !`)
	},
}
