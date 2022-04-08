const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "node",
    description: "Lavalink hakkında bilgi alırsınız",

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
          ephemeral: false
        });
        const all = client.manager.nodes.map(node => 
            `Node ${(node.options.identifier)} bağlandım` +
            `\nÜye: ${node.stats.players}` +
            `\nMüzik oynatılan sunucular: ${node.stats.playingPlayers}` +
            `\nUptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}` +
            `\n\nHafıza` +
            `\nRezerve edilebilir hafıza: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
            `\nKullanılan hafıza: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\nBoş hafıza: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
            `\nTahsis edilen bellek: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
            "\n\nCPU" +
            `\n${node.stats.cpu.cores} işlemci` +
            `\nSistem yükü: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nEwing yükü: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
        ).join('\n\n----------------------------\n');

        const embed = new MessageEmbed()
            .setAuthor({ name: 'Ewing Node', iconURL: client.user.displayAvatarURL()})
            .setDescription(`\`\`\`${all}\`\`\``)
            .setColor(client.embedColor)
        await interaction.followUp({embeds: [embed]})
    }
}
