const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "bot-hakkında",
    category: "Information",
    aliases: [ "bot-hakkında" ],
    description: "Bot hakkında özelliklere erişebilirsiniz.",
    args: false,
    usage: "bot-hakkında",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
        
    const row = new MessageActionRow()
			.addComponents(
    new MessageButton()
    .setLabel("Davet Et")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("GitHub")
    .setStyle("LINK")
    .setURL("https://github.com/ewingdev"),
    new MessageButton()
    .setLabel("Destek Sunucum")
    .setStyle("LINK")
    .setURL("https://discord.gg/javas")
			);

      const mainPage = new MessageEmbed()
            .setAuthor({ name: 'Ewing', iconURL: 'https://cdn.discordapp.com/attachments/936263362185166848/936273646710829156/ewing_1.png'})
            .setThumbnail('https://cdn.discordapp.com/attachments/936263362185166848/936273646710829156/ewing_1.png')
            .setColor('#303236')
            .addField('Kurucular', '[éwing#2319](https://discord.com/users/774591026940739585) ve [émre#1938](https://discord.com/users/860795033590824961)', true)
            .addField('\u200b',
                `[Destek Sunucum](https://discord.gg/javas) | İyi günlerde kullanın!`
            )
        return message.reply({embeds: [mainPage], components: [row]});
    }
}
