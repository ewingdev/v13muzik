const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("❌ Şarkı bulunamıyor!");
    channel.send({embeds: [thing]});
    client.logger.log(`Şarkı bulunamıyor! [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

			}