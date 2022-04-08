const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "hemen-geç", 
    aliases: ["hemen-geç"],
    category: "Music",
    description: "Şarkıyı hemen geçer",
    args: true,
    usage: "<Numaralı şarkı geçme sistemi>",
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

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Kullanım: ${message.client.prefix}hemen-geç <Şarkının sıradaki numarası>`)
            return message.reply({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Hemen geçildi **${position}** şarkı kaldı.`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return message.reply({embeds: [thing]});
	
    }
};
