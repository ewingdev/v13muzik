const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "katıl",
  aliases: ["katıl"],
  category: "Music",
  description: "Sesli kanala katılır",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    
    let player = message.client.manager.get(message.guildId);
        if(player && player.voiceChannel && player.state === "CONNECTED") {
            return await message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription( `Çoktan <#${player.voiceChannel}> kanalına giriş yaptım!`)]})
        } else {
    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetkim Bulunmuyor \`CONNECT\` yada \`SPEAK\`.`)]});
    
    const { channel } = message.member.voice;
   
    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetkim Bulunmuyor \`CONNECT\` yada \`SPEAK\`.`)]});
   
    const emojiJoin = message.client.emoji.join;

     player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 80,
        selfDeafen: true,
      }) 
      if(player && player.state !== "CONNECTED") player.connect();

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiJoin} **Sesli kanala katıldım**\n<#${message.channel.id}>, <#${channel.id}> adlı kanala katıldım`)
      return message.reply({ embeds: [thing] });

    };
  }
};
