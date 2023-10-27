module.exports = async (client, queue, tracks) => {
    try {
        await queue.metadata.channel.send("```" + String(tracks.length) + " Musiques ajoutées. \ntracksadd.```")
    } catch { }
}