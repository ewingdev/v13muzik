const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "devam-et",
    aliases: ["devam-et"],
    category: "Music",
    description: "Durdurulan şarkıyı devam ettirir",
    args: false,
    usage: "<Şarkının sıradaki numarası>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);
        const song = player.queue.current;

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Şuanda şarkı oynatılmıyor.");
            return message.reply({embeds: [thing]});
        }

        const emojiresume = client.emoji.resume;

        if (!player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojiresume} Başarıyla **devam ettirildi**.`)
                .setTimestamp()
          return message.reply({embeds: [thing]});
        }

        player.pause(false);

        let thing = new MessageEmbed()
            .setDescription(`${emojiresume} **Devam ettirildi.**\n[${song.title}](${song.uri})`)
            .setColor(client.embedColor)
            .setTimestamp()
        return message.reply({embeds: [thing]});
	
    }
};