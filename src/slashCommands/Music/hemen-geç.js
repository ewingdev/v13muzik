const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "hemen-geç",
    description: "Şarkıyı hızlıca geçer",
    options: [
      {
        name: "sayı",
        description: "sıradaki sayısı",
        required: true,
        type: "NUMBER"
		}
	],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix ) => {
        await interaction.deferReply({
          ephemeral: false
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala bağlan sonra yeniden dene")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> yeniden dene.`)]});

      const args = interaction.options.getNumber("sayı");
    	const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Oynatılan şarkı yok.");
           return await interaction.editReply({embeds: [thing]});
        }

        const position = Number(args);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
        .setColor("RED")
				.setDescription(`Örnek: ${prefix}ses <Number of song in queue>`)
            return await interaction.editReply({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Geçildi geriye **${position}** şarkı kaldı`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return await interaction.editReply({embeds: [thing]});
	
    }
};
