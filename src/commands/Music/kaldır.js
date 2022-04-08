const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "kaldır",
    category: "Music",
  	description: "Sıradan şarkı kaldırırsınız.",
	  args: true,
    usage: "<Şarkının sıradaki numarası>",
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

    const position = (Number(args[0]) - 1);
       if (position > player.queue.size) {
        const number = (position + 1);
         let thing = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Belirttiğiniz numaradan şarkı bulunamadı ${number}.\nToplam şarkılar: ${player.queue.size}`);
            return message.reply({embeds: [thing]});
        }

    const song = player.queue[position]
		player.queue.remove(position);

		const emojieject = client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Şarkı başarıyla kaldırıldı.\n[${song.title}](${song.uri})`)
		  return message.reply({embeds: [thing]});
	
    }
};