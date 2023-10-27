module.exports = async (client, interaction) => {
    if (interaction.user.bot) return;
    switch (true) {
        //command
        case interaction.type === 2:
            try {
                var command = require(`../../commands/slash/${interaction.commandName}`);
                await command.execute(interaction, client);
                break;
            } catch (e) {
                console.error(e)
                break;
            }
        //button
        case interaction.isButton():
            try {
                var command = require(`../../commands/button/${interaction.customId}`);
                await command(interaction, client)
                break;
            } catch (e) {
                console.error(e)
                break;
            }
        //selectmenu
        case interaction.isSelectMenu():
            try {
                var command = require(`../../commands/menu/${interaction.customId}`);
                await command(interaction, client);
                break;
            } catch (e) {
                console.error(e)
                break;
            }
        //modal
        case interaction.type === 5:
            try {
                var command = require(`../../commands/modal/${interaction.customId}`);
                await command(interaction, client);
                break;
            } catch (e) {
                console.error(e)
                break;
            }
    }
}