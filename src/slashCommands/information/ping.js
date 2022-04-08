const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "şuanki pingi hesaplar",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
        await interaction.editReply({ content: "Pining..." }).then(async () => {
            const ping = Date.now() - interaction.createdAt;
            const api_ping = client.ws.ping;

            await interaction.editReply({
                content: "`🏓`",
                embeds: [new MessageEmbed().setAuthor({name: `Pong`, iconURL: client.user.displayAvatarURL({ dynamic: true })}).setColor(client.embedColor).setFooter({text: `${interaction.member.user.username} tarafından istendi.`, iconURL: interaction.member.user.displayAvatarURL({ dynamic: true })}).addFields([{ name: "Bot pingi", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true }, { name: "API Pingi", value: `\`\`\`\n[ ${api_ping}ms ]\n\`\`\``, inline: true }]).setTimestamp()]
            });
        })
    }
			}