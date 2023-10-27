const { useMainPlayer, useQueue } = require("discord-player")

module.exports = async (interaction, client) => {
    const channel = interaction.member.voice.channel;
    if (!channel) return await interaction.reply({ content: "Rejoignez le salon vocal.", ephemeral: true }); // make sure we have a voice channel

    // let's defer the interaction as things can take time to process
    await interaction.deferReply({ ephemeral: true });
    const source = interaction.fields.getTextInputValue('input_source');

    const player = useMainPlayer();
    const queue = useQueue(interaction.guild.id)
    if (queue) {
        const memberChannelId = interaction.member?.voice?.channelId;
        const queueChannelId = queue?.channel.id;
        if (memberChannelId != queueChannelId) return await interaction.followUp({ content: "BOT Veuillez vous connecter au même salon vocal.", ephemeral: true });
    }
    try {
        await player.play(channel, source, {
            nodeOptions: {
                volume: 5,
                // nodeOptions are the options for guild node (aka your queue in simple word)
                metadata: interaction // we can access this metadata object using queue.metadata later on
            }
        });
        return await interaction.deleteReply();

    } catch (e) {
        // let's return error if something failed
        return interaction.followUp(`L'ajout de musique a échoué.`);
    }

}