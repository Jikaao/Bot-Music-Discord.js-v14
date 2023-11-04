const { SlashCommandBuilder } = require("discord.js");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeatmode")
    .setDescription("Sélectionné le mode de répétition.")
    .addStringOption((option) =>
      option
        .setName("selectmode")
        .setRequired(true)
        .setDescription(
          "Select the playback mode. / Veuillez sélectionner un mode de lecture."
        )
        .addChoices(
          {
            name: "View current mode / Voir le mode actuel",
            value: "show",
          },
          {
            name: "Normal playback. / Lecture normale",
            value: "0",
          },
          {
            name: "Repeat one song. / Répete 1 musique",
            value: "1",
          },
          {
            name: "All songs repeat / Répétez toutes les musiques",
            value: "2",
          },
          {
            name: "autoplay / Lecture automatique",
            value: "3",
          }
        )
    ),
  async execute(interaction, client) {
    const [boolean, queue] = await client.checked.checkQueue(interaction);
    if (!boolean) return await interaction.reply(queue);
    const mode = interaction.options.getString("selectmode");
    if (mode === "show") {
      let status = null;
      switch (queue.repeatMode) {
        case 3:
          status = "autoplay / Lecture automatique";
          break;
        case 2:
          status = "All songs repeat / Répétez toutes les musiques";
          break;
        case 1:
          status = "Repeat one song. / Répete 1 musique";
          break;
        case 0:
          status = "Normal playback. / Lecture normale";
          break;
      }
      await interaction.reply({ ephemeral: true, content: status });
    } else {
      let status = null;
      switch (Number(mode)) {
        case 3:
          status = "autoplay / Lecture automatique";
          queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
          break;
        case 2:
          status = "All songs repeat / Répétez toutes les chansons";
          queue.setRepeatMode(QueueRepeatMode.QUEUE);
          break;
        case 1:
          status = "Repeat one song. / Répete 1 musique";
          queue.setRepeatMode(QueueRepeatMode.TRACK);
          break;
        case 0:
          status = "Normal playback. / Lecture normale";
          queue.setRepeatMode(QueueRepeatMode.OFF);
          break;
      }
      await interaction.deferReply();
      await interaction.deleteReply();
      await client.say.success(
        interaction,
        "Complete!! / Modification terminée.\n" + status
      );
    }
  },
};
