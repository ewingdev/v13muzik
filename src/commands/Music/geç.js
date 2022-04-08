const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "geç",
	aliases: ["geç"],
	category: "Music",
	description: "Oynatılan şarkıyı geçersiniz",
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
        const song = player.queue.current;

           player.stop();
           
		const emojiskip = message.client.emoji.skip;

		let thing = new MessageEmbed()
			.setDescription(`${emojiskip} **Başarıyla geçildi.**\n[${song.title}](${song.uri})`)
			.setColor(message.client.embedColor)
			.setTimestamp()
		return message.reply({embeds: [thing]}).then(msg => { setTimeout(() => {msg.delete()}, 3000);
       })
	
    }
};