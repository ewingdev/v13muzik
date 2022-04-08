const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "sıra-sıfırla",
    aliases: ["sıra-sıfırla"],
    category: "Music",
  	description: "Sırayı sıfırlarsınız",
	  args: false,
    usage: "<Kuyruktaki Şarkı Sayısı>",
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

		player.queue.clear();

		const emojieject = message.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Kuyruktan tüm şarkıları kaldırdı`)
			  return message.reply({embeds: [thing]});
    }
};