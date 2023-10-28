const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Joué une ou plusieurs musique"),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("play")
      .setTitle("Joué une ou plusieurs musique");
    const source = new TextInputBuilder()
      .setCustomId("input_source")
      .setLabel("Saisissez le titre ou l'URL de la musique.")
      .setStyle(TextInputStyle.Short)
      .setMinLength(1)
      .setMaxLength(300);
    modal.addComponents(new ActionRowBuilder().addComponents(source));
    await interaction.showModal(modal);
  },
};
