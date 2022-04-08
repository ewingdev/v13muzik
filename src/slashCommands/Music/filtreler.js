const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
  name: "filtreler",
  description: "Filtre sistemine girersiniz.",
  options: [
    {
        name: "filtreler",
        description: "Filtreler",
        type: "STRING",
        required: true,
        choices: [
            {
                name: "Clear",
                value: "clear"
            },
            {
                name: "Bass",
                value: "bass",
            },
            {
                name: "Night Core",
                value: "night"
            },
            {
                name: "Picth",
                value: "picth"
            },
            {
                name: "Distort",
                value: "distort"
            }, 
            {
                name: "Equalizer",
                value: "eq"
            },
            {
                name: "8D",
                value: "8d"
            },
            {
                name: "Bassboost",
                value: "bassboost"
            },
            {
                name: "Speed",
                value: "speed"
            },
            {
                name: "Vaporwave",
                value: "vapo"
            }
        ]
    }  
],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala bağlı değilsin.")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> sesli kanala girip yeniden deneyiniz.`)]});
    const filter = interaction.options.getString("filter");

    const player = interaction.client.manager.get(interaction.guildId);
    if (!player.queue.current) {
      const thing = new MessageEmbed()
        .setDescription('Oynatılan şarkı yok')
        .setColor(client.embedColor)
      return interaction.editReply({ embeds: [thing] });
     }
      const emojiequalizer = client.emoji.filter;

        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
       switch(filter) {   
       
        case 'bass':
            player.setBassboost(true);
            thing.setDescription(`${emojiequalizer} Bass modu şuanda AÇIK`);
            break;
        case 'eq':   
            player.setEqualizer(true);
            thing.setDescription(`${emojiequalizer} Trablebass modu şuanda AÇIK`);
            break;
        case 'bassboost':
            var bands = new Array(7).fill(null).map((_, i) => (
                { band: i, gain: 0.25 }
            ));
            player.setEQ(...bands);
            thing.setDescription(`${emojiequalizer} Bassboost modu şuanda AÇIK`);
            break;
        case'night':    
            player.setNightcore(true);
            thing.setDescription(`${emojiequalizer} Night Core Equalizer modu şuanda AÇIK`);
            break;
        case'pitch':   
            player.setPitch(2); 
            thing.setDescription(`${emojiequalizer} Pitch Equalizer modu şuanda AÇIK`);
            break;
        case'distort':
            player.setDistortion(true); 
            thing.setDescription(`${emojiequalizer} Distort Equalizer modu şuanda AÇIK`);
            break;
        case'vapo':
            player.setVaporwave(true); 
            thing.setDescription(`${emojiequalizer} Vaporwave Equalizer modu şuanda AÇIK`);
            break;
        case 'clear': 
            player.clearEffects();
            thing.setDescription(`${emojiequalizer} Equalizer modu şuanda KAPALI`);
            break;
        case 'speed': 
            player.setSpeed(2);
            thing.setDescription(`${emojiequalizer} Speed modu şuanda KAPALI`);
        case '8d': 
            player.set8D(true);
            thing.setDescription(`${emojiequalizer} 8D modu şuanda KAPALI`);
        }
         return interaction.editReply({embeds: [thing]});
    }
};
