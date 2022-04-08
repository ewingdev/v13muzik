const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/prefix.js");

module.exports = {
    name: "prefix-ayarla",
    description: "Sunucu içindeki prefixi ayarlarsınız",
    options: [
    {
      name: "prefix",
      description: "Sunucu içindeki prefixi ayarlarsınız",
      required: true,
      type: "STRING"
		}
	],

  
   run: async (client, interaction, prefix) => {
   await interaction.deferReply({
        });
   const data = await db.findOne({ Guild: interaction.guildId});
   const pre = interaction.options.getString("prefix");
   if (!interaction.member.permissions.has('MANAGE_GUILD')) return await interaction.editReply({ ephemeral: true, embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Sunucuyu Yönet yetkiniz bulunmamakta")]
    }).catch(() => {});

  if (!pre[0]) {
    const embed = new MessageEmbed()
        .setDescription("Lütfen koymak istediğiniz prefixi verin")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }
    if (pre[1]) {
       const embed = new MessageEmbed()
        .setDescription("Lütfen çift argümanlı prefix girmeyin")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }
    if (pre[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("Lütfen 3 argümanlı prefix girmeyiniz.")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }
    if(data) {
      data.oldPrefix = prefix;
      data.Prefix = pre;
      await data.save()
    const update = new MessageEmbed()
    .setDescription(`Yeni prefix **${pre}** olarak ayarlandı.`)
    .setColor(client.embedColor)
    .setTimestamp()
    return await interaction.editReply({embeds: [update]});
   } else {
    const newData = new db({
       Guild : interaction.guildId,
       Prefix : pre,
       oldPrefix: prefix
      });
      await newData.save()
    const embed = new MessageEmbed()
    .setDescription(`Prefix sıfırlandı şuanki prefix **${pre}** ayarlandı.`)
    .setColor(client.embedColor)
    .setTimestamp()
    return await interaction.editReply({embeds: [embed]});
   }
 }
}
