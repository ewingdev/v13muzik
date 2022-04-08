const { MessageEmbed, CommandInteraction, Client, Permissions, MessageButton, MessageActionRow } = require("discord.js")
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: "kaydet",
  description: "Oynatılan şarkıyı kaydeder ve dmden size iletir",
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
   
    if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala bağlan sonra yeniden dene")]});

    let player = interaction.client.manager.get(interaction.guildId);
    if (!player.queue.current) {
        let thing = new MessageEmbed()
        .setColor("#FFC942")
        .setDescription("Oynatılan şarkı bulunmamakta.");
        return interaction.reply({embeds: [thing]});
    }

    const song = player.queue.current
    const total = song.duration;
    const current = player.position;

    const dmbut = new MessageButton().setLabel("DM Kutunu kontrol et").setStyle("LINK").setURL(`https://discord.com/users/${client.id}`)
    const row = new MessageActionRow().addComponents(dmbut)

    let dm = new MessageEmbed()
    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
    .setDescription(`:mailbox_with_mail: \`DM kutunu kontrol et!\``)
    .setColor(client.embedColor)
    .setFooter({text: `${interaction.user.tag} tarafından istendi.`})
    .setTimestamp()
    interaction.reply({embeds: [dm], components: [row]})
    const user = client.users.cache.get(interaction.member.user.id);
    const urlbutt = new MessageButton().setLabel("Arat").setStyle("LINK").setURL(song.uri)
    const row2 = new MessageActionRow().addComponents(urlbutt)
    let embed = new MessageEmbed()
        .setDescription(`**Şarkı Hakkında** \n\n > **__Şarkı Adı__**: [${song.title}](${song.uri}) \n > **__Şarkı süresi__**: \`[${convertTime(song.duration)}]\`\n > **__Şarkıyı kaydeden__**: [${interaction.member}]`)
        .setThumbnail(song.displayThumbnail())
        .setColor(client.embedColor)
        .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
     return user.send({embeds: [embed], components: [row2]})

   }
};
