const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Mettre en pause la musique"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Il n'y a aucune musique dans la file d'attente")

		queue.setPaused(true)
        await interaction.editReply("La musique a été mise en pause ! Utilisez `/start` pour reprendre la musique")
	},
}
