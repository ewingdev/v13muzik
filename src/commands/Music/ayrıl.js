const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "ayrıl",
    aliases: "ayrıl",
    category: "Music",
    description: "Bot sesli kanaldan ayrılır",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
       
        const player = message.client.manager.get(message.guild.id);

        const emojiLeave = message.client.emoji.leave;

        player.destroy();
        
        let thing = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setDescription(`${emojiLeave} **Sesli kanaldan ayrıldım**\nBeni kullandığınız için teşekkür ederim ${message.client.user.username}!`)
          return message.reply({embeds: [thing]});
	
    }
};