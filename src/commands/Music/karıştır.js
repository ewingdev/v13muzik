const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "karıştır",
    category: "Music",
    description: "sırayı karıştırır",
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
        player.queue.shuffle();
        
        const emojishuffle = client.emoji.shuffle;

        let thing = new MessageEmbed()
            .setDescription(`${emojishuffle} sıradaki şarkılar karıştırıldı.`)
            .setColor(client.embedColor)
            .setTimestamp()
        return message.reply({embeds: [thing]}).catch(error => client.logger.log(error, "error"));
	
    }
};