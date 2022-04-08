const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "guildDelete",
run: async (client, guild) => {
  
  const channel = client.channels.cache.get(client.config.logs);
  let own = await guild.fetchOwner()
  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📤 Sunucudan atıldım !!`)
    .addField('Sunucu ismi', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Sahibi', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
    .addField('Üye sayısı', `\`${guild.memberCount}\` Members`)
    .addField('Creation oluşturulma tarihi', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .addField(`${client.user.username} sunucu sayısı `, `\`${client.guilds.cache.size}\`'a düştü`)
    .setColor(client.embedColor)
    .setTimestamp()
    channel.send({embeds: [embed]});
  }
}
