const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "durdur",
    category: "Music",
    description: "Oynatılan şarkıyı durdurur",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
    
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Şuanda şarkı oynatılmıyor.");
            return message.reply({embeds: [thing]});
        }

        const emojipause = client.emoji.pause;

        if (player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojipause} Şarkı durduruldu.`)
                .setTimestamp()
                return message.reply({embeds: [thing]});
        }

        player.pause(true);

        const song = player.queue.current;

        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setDescription(`${emojipause} **Şarkı başarıyla durduruldu**\n[${song.title}](${song.uri})`)
          return message.reply({embeds: [thing]});
	
    }
};
