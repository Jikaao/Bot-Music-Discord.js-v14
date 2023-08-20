const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Charge des musiques de youtube")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("musique")
				.setDescription("Joue une musique à partir d'un lien")
				.addStringOption((option) => option.setName("url").setDescription("Lien de la musique").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Joue une playlist à partir d'un lien")
				.addStringOption((option) => option.setName("url").setDescription("Lien de la playlist").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("recherche")
				.setDescription("Recherche une musique avec des mots-clés")
				.addStringOption((option) =>
					option.setName("motclé").setDescription("Les mots clés de la recherche").setRequired(true)
				)
		),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply("Vous devez être dans un salon vocal pour utiliser cette commande")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()

		if (interaction.options.getSubcommand() === "musique") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Pas de résultat")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** à bien été ajouté à la liste d'attente.`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Durée: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Pas de résultat")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} musiques de [${playlist.title}](${playlist.url})** à bien été ajouté à la liste d'attente`)
                .setThumbnail(playlist.thumbnail)
		} else if (interaction.options.getSubcommand() === "recherche") {
            let url = interaction.options.getString("motclé")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Pas de résultat")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** à bien été ajouté à la liste d'attente`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Durée: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}