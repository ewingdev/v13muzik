const { MessageEmbed, CommandInteraction, Client, MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "bot-hakkında",
    description: "Bot hakkında özelliklere erişebilirsiniz.",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
   const row = new MessageActionRow()
       .addComponents(
    new MessageButton()
    .setLabel("Botu Ekle")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("Destek Sunucusu")
    .setStyle("LINK")
    .setURL("https://discord.gg/devtr")
			);

      const mainPage = new MessageEmbed()
            .setAuthor({ name: 'Ewing', iconURL: 'https://cdn.discordapp.com/attachments/936263362185166848/936273646710829156/ewing_1.png'})
            .setThumbnail('https://cdn.discordapp.com/attachments/936263362185166848/936273646710829156/ewing_1.png')
            .setColor('#303236')
            .addField('Kurucular', '[éwing#2319](https://discord.com/users/774591026940739585) ve [émre#1938](https://discord.com/users/860795033590824961)', true)
            .addField('\u200b',
                `[Destek Sunucum](https://discord.gg/javas) | İyi günlerde kullanın!`
            )
        await interaction.followUp({embeds: [mainPage], components: [row]});
    }
}
