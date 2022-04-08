const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "kaydet",
    aliases: ["kaydet"],
    category: "Music",
    description: "Kaydeder ve şu anda oynayan şarkıyı gönderir",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
            .setColor("#FFC942")
            .setDescription("> Şuanda şarkı oynatılmıyor.");
            return message.channel.send({embeds: [thing]});
        }

        const song = player.queue.current
        const total = song.duration;
        const current = player.position;

        const dmbut = new MessageButton().setLabel("Dm kutunu kontrol et").setStyle("LINK").setURL(`https://discord.com/users/${client.id}`)
        const row = new MessageActionRow().addComponents(dmbut)

        let dm = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL()})
        .setDescription(`:mailbox_with_mail: \`Dm kutunu kontrol et!\``)
        .setColor(client.embedColor)
        .setFooter({text: `${message.author.tag} tarafından istendi.`})
        .setTimestamp()
        message.reply({embeds: [dm], components: [row]})
        
        const urlbutt = new MessageButton().setLabel("Arat").setStyle("LINK").setURL(song.uri)
        const row2 = new MessageActionRow().addComponents(urlbutt)
        let embed = new MessageEmbed()
            .setDescription(`**Şarkı Hakkında** \n\n > **__Şarkı İsmi__**: [${song.title}](${song.uri}) \n > **__Şarkı süresi__**: \`[${convertTime(song.duration)}]\`\n > **__Şarkıyı kaydeden__**: [${message.author}]`)
            .setThumbnail(song.displayThumbnail())
            .setColor(client.embedColor)
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
         return message.author.send({embeds: [embed], components: [row2]})
            
    }
};
