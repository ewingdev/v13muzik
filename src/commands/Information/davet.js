const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "davet",
    category: "Information",
    aliases: [ "davet","botuekle","botu-ekle" ],
    description: "botu eklersin",
    args: false,
    usage: "",
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
    .setLabel("Destek Sunucum")
    .setStyle("LINK")
    .setURL("https://discord.gg/javas")
			);

          const mainPage = new MessageEmbed()
            .setAuthor({ name: 'Ewing', iconURL: 'https://cdn.discordapp.com/attachments/936263362185166848/936273646710829156/ewing_1.png'})
            .setThumbnail('https://cdn.discordapp.com/attachments/936263362185166848/936273646710829156/ewing_1.png')
            .setColor('#303236')
            .addField('Ewing botu ekle', `[Tıkla](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot)`, true)
           message.reply({embeds: [mainPage], components: [row]})
    }
}
