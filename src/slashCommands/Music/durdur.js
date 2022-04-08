const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "durdur",
    description: "Oynatılan şarkıyı durdurur",

	
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

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Oynatılan şarkı yok.");
            return interaction.editReply({embeds: [thing]});
        }

        const emojipause = client.emoji.pause;

        if (player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojipause} Şarkı zaten durduruldu.`)
                .setTimestamp()
                return interaction.editReply({embeds: [thing]});
        }

        player.pause(true);

        const song = player.queue.current;

        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setDescription(`${emojipause} **Duruduruldu**\n[${song.title}](${song.uri})`)
          return interaction.editReply({embeds: [thing]});
	
    }
};
