const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "sıra-sıfırla",
    description: "Sırayı sıfırlarsınız",
	
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
        if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala girmen lazım.")]});
        if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> Sesli kanalda yeniden deneyiniz.`)]});

        const player = interaction.client.manager.get(interaction.guildId);              
       if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Şuanda oynatılan şarkı yok.");
             return interaction.editReply({embeds: [thing]});
        }
        
     		player.queue.clear();

		  const emojieject = client.emoji.remove;

		  let thing = new MessageEmbed()
	   		.setColor(client.embedColor)
  			.setTimestamp()
		  	.setDescription(`${emojieject} Sıradaki şarkılar silindi.`)
         return interaction.editReply({embeds: [thing]});
	
    }
};
