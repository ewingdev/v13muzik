const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
  name: "ayrıl",
  description: "Sesli kanaldan ayrılırım",

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanalda değilsin ve sesli kanalda bulunmuyorum")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`Sesli kanala katıldım. <#${interaction.guild.me.voice.channelId}>.`)]});

    const player = client.manager.get(interaction.guildId);
   
    const emojiLeave = client.emoji.leave;
        
        player.destroy();
        
        let thing = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`${emojiLeave} **Sesli kanaldan ayrıldım**\nKullandığınız için teşşekkür ederim ☺ ${interaction.client.user.username}!`)
        return interaction.editReply({ embeds: [thing] });
        
        }
     };
