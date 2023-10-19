const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("Passe la musique du numéro choisi #")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Il n'y a pas de musique dans la liste d'attente")

        const trackNum = interaction.options.getNumber("Numéro de piste")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Numéro de piste invalide")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Passe à la piste numéro ${trackNum}`)
	},
}
