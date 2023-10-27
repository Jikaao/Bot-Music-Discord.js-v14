const { EmbedBuilder, Colors } = require("discord.js")

function track_embed(track) {
    if (!track) {
        throw Error("'track'doit être transmis en tant que paramètre!(queueEmbed)");
    }
    const embed = new EmbedBuilder()
        .setColor(Colors.Fuchsia)
        .setAuthor({ name: "🎵Joue actuellement !!🎵" })
        .setTitle(track.title)
        .setDescription(track.description)
        .addFields([
            {
                name: "Requête par",
                value: track.requestedBy.username
            },
            {
                name: "Durée",
                value: track.duration
            }
        ])
        .setImage(track.thumbnail)
        .setFooter({ iconURL: devicon, text: "Joué par " + devname })
    return embed
}

function panel_help_embed() {
    const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setAuthor({ name: "help" })
        .setTitle("Comment utiliser le panneau.")
        .setDescription("Appuyer sur un Emoji exécute les fonctions suivantes.")
        .addFields([
            {
                name: "▶ Resume music.",
                value: "```Reprenez la lecture de la musique.```"
            },
            {
                name: "⏸ Pause music.",
                value: "```Mettre la musique en pause。```"
            },
            {
                name: "🔉🔊 Adjust the volume.",
                value: "```Régler le volume。```"
            },
            {
                name: "↩ Playback from the beginning.",
                value: "```Rejouez depuis le début.```"
            },
            {
                name: "🔀 Shuffle the music in the queue.",
                value: "```Mélangez la musique dans la file d'attente.```"
            },
            {
                name: "⏭ Skips the currently playing music",
                value: ".```Ignorer la musique en cours de lecture。```"
            },
            {
                name: "🎧 Add/play music",
                value: "```Ajouter/lire de la musique.```"
            },
            {
                name: "📃 Displays music added to the queue.",
                value: "```Affichez la musique qui a été ajoutée à votre file d'attente.```"
            },
            {
                name: "🚫 Delete all music added to the queue.",
                value: "```Supprimez toute les musiques ajoutée à la file d'attente.```"
            }
        ])
        .setFooter({ iconURL: devicon, text: "Joué par " + devname })
    return embed
}

function command_help_embed() {
    const embed = new EmbedBuilder()
        .setAuthor({ name: "commande help" })
        .setTitle("Comment utiliser les commandes Slash")
        .setColor(Colors.DarkOrange)
        .setFooter({ iconURL: devicon, text: "Joué par " + devname })
        .addFields([
            {
                name: "/jump",
                value: "`Skips the queue until the specified index.`\n`Passer la file d'attente à l'index spécifié.`"
            },
            {
                name: "/remove",
                value: "`Deletes a track at the specified index in the queue.`\n`Supprime la musique à l'index spécifié dans la file d'attente.`"
            },
            {
                name: "/repeatmode",
                value: "`Selects the playback mode for the song.`\n`Sélectionnez le mode de lecture des musiques.`"
            },
            {
                name: "/play",
                value: "`Play the song. (YoutubeURL,YoutubePlaylist,SpotifyURL,Title)`\n`Joue une musique.(YoutubeURL,YoutubePlaylist,SpotifyURL,Title)`"
            },
        ])
    return embed
}

function queue_embed(interaction, queue, multiple, page) {
    const maxPages = Math.ceil(queue.size / multiple);
    if (page < 1 || page > maxPages) page = 1;
    const end = page * multiple;
    const start = end - multiple;
    const tracks = queue.tracks.toArray().slice(start, end)
    const embed = new EmbedBuilder()
        .setAuthor({ name: `PAGE${String(page)}` })
        .setColor(Colors.Gold)
        .setTitle(`${interaction.guild.name}'s queue.`)
        .setFooter({ iconURL: devicon, text: "Joué par " + devname })
        .setDescription(
            tracks.map(
                (track, i) =>
                    `${String(10 * (page - 1) + i + 1)}: [(URL)](${track.url})\n` + "```" + track.title + "```"
            ).join("\n")
        )
    return embed
}

module.exports = {
    track_embed,
    panel_help_embed,
    command_help_embed,
    queue_embed
}