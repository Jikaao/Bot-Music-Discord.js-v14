const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("stop").setDescription("Arrête le bot et efface la file d'attente"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Il n'y a pas de musiques dans la file d'attente")

		queue.destroy()
        await interaction.editReply("Bye Bye My best friend, Shoo bi doo waa !")
	},
}