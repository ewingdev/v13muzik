const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction, Client } = require("discord.js");

module.exports = {
    name: "yardım",
    description: "Yardım komutunu listeler",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix) => {
        await interaction.deferReply({
          ephemeral: false
        });
  const embed = new MessageEmbed()
    .setTitle(`${client.user.username} Yardım Menüsü`)
    .setDescription(`Merhaba **<@${interaction.member.id}>**, Ben <@${client.user.id}>.  \n\n🐱‍👤 Müzik botu olarak sizlere hizmet vermekten gurur duyuyorum \nDestek sunucuma katılmayı unutmayın. \n\n\`🎵\`• Müzik\n\` ℹ️ \`• Bilgilendirme\n\`⚙️\`• Ayarlama\n\n *Aşağıdaki butonlara tıklayarak kategorilerime ulaşabilirsiniz* \n\n`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter({ text: `${interaction.member.user.username} tarafından paylaşıldı.`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})})
    
    let but1 = new MessageButton().setCustomId("home").setLabel("🏠 Ana Sayfa").setStyle("SUCCESS")
  
    let but2 = new MessageButton().setCustomId("music").setLabel("🎼 Müzik").setStyle("PRIMARY")
  
    let but3 = new MessageButton().setCustomId("information").setLabel("📚 Bilgilendirme").setStyle("PRIMARY");

    let but4 = new MessageButton().setCustomId("config").setLabel("🛠 Ayarlandırma").setStyle("PRIMARY");

     let _commands;
     let editEmbed = new MessageEmbed();
     
     await interaction.editReply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] });

    const collector = interaction.channel.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === interaction.member.user.id) return true;
       else {
     b.reply({ ephemeral: true, content: `**${interaction.member.user.tag}** yeniden deneyin.`}); return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on("end", async () => {
        await interaction.editReply({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true))] }).catch(() => {});
     });
    collector.on('collect', async (b) => {
      if(!b.deferred) await b.deferUpdate()
         if(b.customId === "home") {
           return await interaction.editReply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Müzik Komutları").setFooter(`Toplam ${_commands.length} komut bulunmakta.`);
 
           return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
         if(b.customId == "information") {
         _commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Bilgi komutları").setFooter(`Toplam ${_commands.length} komut bulunmakta.`)
          return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         }
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Ayarlama komutları").setFooter(`Toplam ${_commands.length} komut bulunmakta.`)
          return await interaction.editReply({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         
        }
     });
   }
 }
