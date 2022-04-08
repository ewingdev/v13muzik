const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ses",
    aliases: "ses",
    category: "Music",
    description: "şarkının sesini yüksetirsiniz yada düşürürsünüz.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
execute: async (message, args, client, prefix) => {
  
	const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Şuanda şarkı oynatılmıyor.");
            return message.reply({embeds: [thing]});
		}
		
		const volumeEmoji = client.emoji.volumehigh;

		if (!args.length) {
			let thing = new MessageEmbed()
			.setColor(client.embedColor)
			.setTimestamp()
			.setDescription(`${volumeEmoji} İarkının sesi şuanda: **${player.volume}%**`)
			return message.reply({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 100) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Kullanım: ${prefix}ses <0 - 100 arasında sayı belirleyin>`)
            return message.reply({embeds: [thing]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = client.emoji.volumehigh;
			let thing = new MessageEmbed()
				.setColor(client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} Ses şuanda: **${volume}%**`)
		  return message.reply({embeds: [thing]});
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new MessageEmbed()
				.setColor(client.embedColor)
				.setTimestamp()
				.setDescription(`${emojivolume} Ses şuanda: **${volume}%**`)
		  return message.reply({embeds: [thing]});
		} else {
			let thing = new MessageEmbed()
				.setColor(client.embedColor)
				.setTimestamp()
				.setDescription(`${volumeEmoji} Ses şuanda: **${volume}%**`)
			return message.reply({embeds: [thing]});
		}
		
 	}
};
