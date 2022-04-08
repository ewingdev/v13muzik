const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "guildCreate",
run: async (client, guild) => {
  
  const channel = client.channels.cache.get(client.config.logs);
  let own = await guild.fetchOwner()
  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📥 Sunucuya eklendim !!`)
    .addField('Sunucu İsmi', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Sahibi', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
    .addField('Üye sayısı', `\`${guild.memberCount}\` Members`)
    .addField('Oluşturulma tarihi', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .setColor(client.embedColor)
    .addField(`${client.user.username} sunucu log'u`, `\`${client.guilds.cache.size}\` sunucu oldu`)
    .setTimestamp()
    channel.send({embeds: [embed]})
  }
	
};
