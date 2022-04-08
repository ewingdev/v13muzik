const { MessageEmbed, CommandInteraction, Client, Permissions } = require("discord.js")

module.exports = {
  name: "katıl",
  description: "Bot sesli kanala katılır",
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });
    let player = interaction.client.manager.get(interaction.guildId);
        if(player && player.voiceChannel && player.state === "CONNECTED") {
            return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription( `<#${player.voiceChannel}> kanalında bağlıyım!`)]})
        } else {
      if(!interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetersiz izin \`CONNECT\` ve \`SPEAK\`.`)]});
      const { channel } = interaction.member.voice;
      if(!interaction.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetersiz izin \`CONNECT\` ve \`SPEAK\`.`)]});
      if(!interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Bu komutu kullanmak için yeterli izim yok.`)]});
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala bağlandım")]});
     
    const emojiJoin = client.emoji.join;

     player = client.manager.create({
        guild: interaction.guildId,
        textChannel: interaction.channelId,
        voiceChannel: interaction.member.voice.channelId,
        selfDeafen: true,
        volume: 80
      })
      if(player && player.state !== "CONNECTED") player.connect();

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiJoin} **Sesli kanala katıldım**\nGirilen kanal <#${channel.id}> \n Komut kullanılan kanal <#${interaction.channel.id}>`)
      return interaction.editReply({ embeds: [thing] });

    };

  }
};
