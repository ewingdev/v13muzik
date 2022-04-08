const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "devamet",
    description: "Durdurulan şarkıyı kaldığı yerden devam ettirir",
	
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala bağlan sonra yeniden dene")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> yeniden dene.`)]});

        const player = interaction.client.manager.get(interaction.guildId);              
        const song = player.queue.current;

       if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Oynatılan şarkı yok.");
             return interaction.editReply({embeds: [thing]});
        }

        const emojiresume = client.emoji.resume;

        if (!player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojiresume} Şarkı zaten önceden **durduruldu**.`)
                .setTimestamp()
           return interaction.editReply({embeds: [thing]});
        }

        player.pause(false);

        let thing = new MessageEmbed()
            .setDescription(`${emojiresume} **Devam ettirildi**\n[${song.title}](${song.uri})`)
            .setColor(client.embedColor)
            .setTimestamp()
         return interaction.editReply({embeds: [thing]});
	
    }
};
