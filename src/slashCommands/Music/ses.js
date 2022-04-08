const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ses",
    description: "Şarkının sesini ayarlarsınız.",
      options: [
      {
        name: "sayı",
        description: "bana bir sayı değeri verin ",
        required: true,
        type: "NUMBER"
	  	}
	],

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

    const volumeEmoji = client.emoji.volumehigh;
    const emojivolume = client.emoji.volumehigh;
		
    const vol = interaction.options.getNumber("sayı");

  	const player = client.manager.get(interaction.guildId);
	  if(!player) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Oynatılan şarkı yok.`)]
    }).catch(() => {});
    if (!player.queue.current) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Oynatılan şarkı yok.`)]
    }).catch(() => {});
  const volume = Number(vol);
		if (!volume || volume < 0 || volume > 100) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Örnek: ${client.prefix}ses <0 - 100 arasında kullanın>`)]
    }).catch(() => {});

   player.setVolume(volume);   
  if (volume > player.volume) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Ses: **${volume}% olarak ayarlandı.**`)]
    }).catch(() => {});
  else if (volume < player.volume) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Ses: **${volume}% olarak ayarlandı**`)]
    }).catch(() => {});
   else 
  await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Ses: **${volume}% olarak ayarlandı.**`)]
    }).catch(() => {});
   }
			}
