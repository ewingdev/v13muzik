
const { MessageEmbed, version, CommandInteraction, Client } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "status",
    description: "Show status bot",
    run: async (client, interaction) => {

      await interaction.deferReply({
            ephemeral: false
        });
        
       const duration1 = moment.duration(interaction.client.uptime).format(" G [gün], S [saat], d [dakika], s [saniye]");
        const cpu = await si.cpu();
        const about = interaction.client.emoji.about;
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount 

})
        const embed = new MessageEmbed()
            .setColor(interaction.client.embedColor)
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setDescription(`${about} **Istatistikler**
**= ISTATISTIKLER =**
**• Sunucu** : ${scount}
**• Kanal** : ${ccount}
**• Üye** : ${mcount}
**• Discord.js** : v${version}
**• Node** : ${process.version}
**= SYSTEM =**
**• Platfrom** : ${os.type}
**• Uptime** : ${duration1}
**• SISTEM** :
> **• Core** : ${cpu.cores}
> **• Model** : ${os.cpus()[0].model} 
> **• Hızı** : ${os.cpus()[0].speed} MHz
**• BELLEK** :
> **• Toplam bellek** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Boş bellek** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Toplam bellek** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Önbellek belleği** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
`);
        interaction.followUp({embeds: [embed]});
    }
}

