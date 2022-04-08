const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "247",
  aliases: "247",
  category: "Music",
  description: "belirtilen kanalda 7/24 aktif kalırım",
  args: false,
  usage: "247",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {


    const player = message.client.manager.players.get(message.guild.id);
    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`24/7 modu kapandı.`)
      return message.reply({embeds: [embed]});
    }
    else {
      player.twentyFourSeven = true;
      const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setDescription(`24/7 modu açıldı.`)
      
      return message.reply({embeds: [embed]});
    }
  }
};