const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

//Default button
function panelbuttons_1() {
    const button_1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("trackadd").setStyle(ButtonStyle.Secondary).setEmoji("🎧"),
            new ButtonBuilder().setCustomId("volumedown").setStyle(ButtonStyle.Success).setEmoji("🔉"),
            new ButtonBuilder().setCustomId("pause").setStyle(ButtonStyle.Danger).setEmoji("⏸"),
            new ButtonBuilder().setCustomId("volumeup").setStyle(ButtonStyle.Success).setEmoji("🔊"),
            new ButtonBuilder().setCustomId("destroy").setStyle(ButtonStyle.Secondary).setEmoji("🚫"),
        )
    const button_2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("queue").setStyle(ButtonStyle.Secondary).setEmoji("📃"),
            new ButtonBuilder().setCustomId("replay").setStyle(ButtonStyle.Primary).setEmoji("↩"),
            new ButtonBuilder().setCustomId("shuffle").setStyle(ButtonStyle.Primary).setEmoji("🔀"),
            new ButtonBuilder().setCustomId("skip").setStyle(ButtonStyle.Primary).setEmoji("⏭"),
            new ButtonBuilder().setCustomId("help").setStyle(ButtonStyle.Secondary).setEmoji("✋"),
        )
    return [button_1, button_2]
}

//Button when pause
function panelbuttons_2() {
    const button_1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("trackadd").setStyle(ButtonStyle.Secondary).setEmoji("🎧"),
            new ButtonBuilder().setCustomId("volumedown").setStyle(ButtonStyle.Success).setEmoji("🔉"),
            new ButtonBuilder().setCustomId("resume").setStyle(ButtonStyle.Primary).setEmoji("▶"),
            new ButtonBuilder().setCustomId("volumeup").setStyle(ButtonStyle.Success).setEmoji("🔊"),
            new ButtonBuilder().setCustomId("destroy").setStyle(ButtonStyle.Secondary).setEmoji("🚫"),
        )
    const button_2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId("queue").setStyle(ButtonStyle.Secondary).setEmoji("📃"),
            new ButtonBuilder().setCustomId("replay").setStyle(ButtonStyle.Primary).setEmoji("↩"),
            new ButtonBuilder().setCustomId("shuffle").setStyle(ButtonStyle.Primary).setEmoji("🔀"),
            new ButtonBuilder().setCustomId("skip").setStyle(ButtonStyle.Primary).setEmoji("⏭"),
            new ButtonBuilder().setCustomId("help").setStyle(ButtonStyle.Secondary).setEmoji("✋"),
        )
    return [button_1, button_2]
}

module.exports = {
    panelbuttons_1,
    panelbuttons_2
}