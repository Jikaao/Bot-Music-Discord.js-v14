const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jump")
        .setDescription("Accédez à une musique spécifique dans la file d'attente sans supprimer d'autres musiques")
        .addNumberOption(oprion =>
            oprion
                .setName("index")
                .setDescription("Entrez le numéro de la musique que vous souhaitez passer")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const [boolean, queue] = await client.checked.checkQueue(interaction)
        if (!boolean) return await interaction.reply(queue)
        if (queue.isEmpty()) return await interaction.reply({ ephemeral: true, content: "The queue has no more track.\nIl n'y a aucune musique dans la file d'attente." });
        const index = interaction.options.getNumber("index") - 1;
        if (index > queue.size || index < 0) return await interaction.reply({ ephemeral: true, content: "The song with the entered number does not exist.\nLa musique portant le numéro que vous avez saisi n'existe pas." })
        await interaction.deferReply();
        await interaction.deleteReply();
        queue.node.jump(index);
        await client.say.success(interaction, "complete!!\nLa musique a été skip.")
    }
}