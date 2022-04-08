const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "yardım",
    category: "Information",
    aliases: [ "yardım","y" ],
    description: "Yardım komutunu listeler",
    args: false,
    usage: "",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix) => {

  const embed = new MessageEmbed()
    .setTitle(`${client.user.username} Yardım menüsü`)
    .setDescription(` Merhaba **<@${message.author.id}>**, Ben <@${client.user.id}>.  \n\n🐱‍👤 Müzik botu olarak sizlere hizmet vermekten gurur duyuyorum \nDestek sunucuma katılmayı unutmayın. \n\n\`🎵\`• Müzik\n\` ℹ️ \`• Bilgilendirme\n\`⚙️\`• Ayarlama\n\n *Aşağıdaki butonlara tıklayarak kategorilerime ulaşabilirsiniz* \n\n`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter({text: `${message.author.tag} tarafından istendi.`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                
    let but1 = new MessageButton().setCustomId("home").setLabel("🏠 Ana Sayfa").setStyle("SUCCESS")
  
    let but2 = new MessageButton().setCustomId("music").setLabel("🎼 Müzik").setStyle("PRIMARY")
  
    let but3 = new MessageButton().setCustomId("information").setLabel("📚 Bilgilendirme").setStyle("PRIMARY");

    let but4 = new MessageButton().setCustomId("config").setLabel("🛠 Ayarlandırma").setStyle("PRIMARY");

     let _commands;
     let editEmbed = new MessageEmbed();
     
    const m = await message.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] });

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
      if(b.user.id === message.author.id) return true;
       else {
     b.reply({ ephemeral: true, content: `**${message.author.tag}** yeniden deneyin.`}); return false;
           };
      },
      time : 60000,
      idle: 60000/2
    });
    collector.on("end", async () => {
		 if(!m) return;
        await m.edit({ components: [new MessageActionRow().addComponents(but1.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true))] }).catch(() => {});
    });
    collector.on('collect', async (b) => {
       if(!b.deferred) await b.deferUpdate()
        if(b.customId === "home") {
           if(!m) return;
           return await m.edit({ embeds: [embed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
        if(b.customId === "music") {
         _commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Müzik Komutları").setFooter(`Toplam ${_commands.length} komut bulunmakta.`);
           if(!m) return;
           return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
        }
         if(b.customId == "information") {
         _commands = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Bilgi komutları").setFooter(`Toplam ${_commands.length} komut bulunmakta.`)
          return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         }
         if(b.customId == "config") {
         _commands = client.commands.filter((x) => x.category && x.category === "Config").map((x) => `\`${x.name}\``);
             editEmbed.setColor(client.embedColor).setDescription(_commands.join(", ")).setTitle("Ayarlama komutları").setFooter(`Toplam ${_commands.length} komut bulunmakta.`)
          return await m.edit({ embeds: [editEmbed], components: [new MessageActionRow().addComponents(but1, but2, but3, but4)] })
         
        }
     });
   }
 }
