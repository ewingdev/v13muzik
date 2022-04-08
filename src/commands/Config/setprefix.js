const { MessageEmbed } = require("discord.js");
const db = require("../../schema/prefix.js");
module.exports = {
  name: "prefix-ayarla",
  category: "Config",
  description: "Sunucudaki prefixi ayarlar",
  args: false,
  usage: "prefix",
  aliases: ["prefix"],
  permission: [],
  owner: false,
  execute: async (message, args, client, prefix) => {

    const data = await db.findOne({ Guild: message.guildId });
    const pre = await args.join(" ")
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('`Sunucuyu Yönet` yetkiniz bulunmamakta.');
    if (!pre[0]) {
      const embed = new MessageEmbed()
        .setDescription("Yeni prefiximi belirtin!")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (pre[1]) {
      const embed = new MessageEmbed()
        .setDescription("Prefixi bir çift argüman ayarlayamazsınız")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (pre[0].length > 3) {
      const embed = new MessageEmbed()
        .setDescription("Prefixi 3'ten fazla karakter gönderemezsiniz")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (data) {
      data.oldPrefix = prefix;
      data.Prefix = pre;
      await data.save()
      const update = new MessageEmbed()
        .setDescription(`Prefix **${pre}** olarak ayarlandı.`)
        .setColor(client.embedColor)
        .setTimestamp()
      return message.reply({ embeds: [update] });
    } else {
      const newData = new db({
        Guild: message.guildId,
        Prefix: pre,
        oldPrefix: prefix
      });
      await newData.save()
      const embed = new MessageEmbed()
        .setDescription(`Bu sunucudaki özel prefix **${pre}**`)
        .setColor(client.embedColor)
        .setTimestamp()
      return message.reply({ embeds: [embed] });

    }
  }
};
