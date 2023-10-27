const { track_embed } = require("../../utils/embeds")
const { panelbuttons_1 } = require("../../utils/buttons")

module.exports = async (client, queue, track) => {
    try {
        if (!track.requestedBy) track.requestedBy = client.user;
        const msg = await client.panels.get(queue.metadata.guild.id)
        if (msg) await msg.delete()
        const new_msg = await queue.metadata.channel.send({
            embeds: [
                track_embed(track)
            ],
            components: panelbuttons_1()
        });
        client.panels.set(queue.metadata.guild.id, new_msg)
        return;
    }
    catch { }
}