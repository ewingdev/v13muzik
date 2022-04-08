const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "şuanda-çalan",
    aliases: "şuanda-çalan",
    category: "Music",
    description: "Oynatılan şarkıyı görüntüler",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Şuanda şarkı oynatılmıyor.");
            return message.channel.send(thing);
        }
        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;
        
        let embed = new MessageEmbed()
            .setDescription(`${emojimusic} **Şuanda oynatılan şarkı**\n[${song.title}](${song.uri}) - \`[${convertTime(song.duration)}]\`-\n\n\`${progressbar(player)}\``)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor(client.embedColor)
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
            return message.channel.send({embeds: [embed]})

    }
}
