const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Supprimé une musique")
    .addNumberOption((oprion) =>
      oprion
        .setName("index")
        .setDescription(
          "Entré le numéro de la musique que vous voulez supprimé."
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const [boolean, queue] = await client.checked.checkQueue(interaction);
    if (!boolean) return await interaction.reply(queue);
    const index = interaction.options.getNumber("index") - 1;
    if (index > queue.size || index < 0)
      return await interaction.reply({
        ephemeral: true,
        content:
          "The song with the entered number does not exist.\nLa musique portant le numéro que vous avez saisi n'existe pas.",
      });
    await interaction.deferReply();
    await interaction.deleteReply();
    queue.node.remove(index);
    await client.say.success(interaction, "complete!!\nSuppression terminée.");
  },
};
