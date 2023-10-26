const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("start").setDescription("Reprendre la musique"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Il n'y a aucune musique dans la file d'attente")

		queue.setPaused(false)
        await interaction.editReply("La musique a été relancé ! Utilisez `/pause` pour mettre la musique en pause.")
	},
}