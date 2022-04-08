const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
        name: "geç",
        description: "Şarkıyı geçer.",
    
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} color 
     */

  run: async (client, interaction) => {
    await interaction.deferReply({
            ephemeral: false
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala bağlan sonra yeniden dene")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> yeniden dene.`)]});

   	const emojiskip = client.emoji.skip;
  if(!interaction.member.voice?.channel) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Sesli kanalda bağlı değilsin.")]
    }).catch(() => {});
    
  if(interaction.guild.me.voice.channel && interaction.member.voice?.channelId !== interaction.guild.me.voice.channelId) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Sesli kanala bağlan ve yeniden ${interaction.guild.me.voice.channel} dene.`)]
    }).catch(() => {});
      const player = client.manager.get(interaction.guildId);
    if(!player) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Oynatılan şarkı yok..`)]
    }).catch(() => {});
    if(player && player.state !== "CONNECTED") {
       player.destroy(); 
      return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Oynatılan şarkı yok..`)]
      }).catch(() => {});
    };
   if(!player.queue) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Oynatılan şarkı yok..")]
   }).catch(() => {});
        if(!player.queue.current) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Oynatılan şarkı yok..")]
      }).catch(() => {});

        if(!player.queue.size) return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Geçilecek şarkı yok.")]
      }).catch(() => {});

        player.stop();
        return await interaction.editReply({
            embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiskip} **Geçildi** \n[${player.queue.current.title}](${player.queue.current.uri})`)]
        }).catch(() => {});
  }
					}
