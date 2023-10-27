const {panel_help_embed} = require("../../utils/embeds")

module.exports = async(interaction, client) => {
    await interaction.reply({
        ephemeral: true,
        embeds: [
            panel_help_embed()
        ]
    })
}