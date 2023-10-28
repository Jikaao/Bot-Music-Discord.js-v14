const { command_help_embed } = require("../../utils/embeds");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("help"),
  async execute(interaction, client) {
    await interaction.reply({
      ephemeral: true,
      embeds: [command_help_embed()],
    });
  },
};
