const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kaldır",
    description: "Sıradan şarkı kaldırır",
    options: [
      {
        name: "sayi",
        description: "Sıradan şarkı kaldırır.",
        required: true,
        type: "NUMBER"
		}
	],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix ) => {
        await interaction.deferReply({
          ephemeral: false
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanala bağlan sonra yeniden dene")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> yeniden dene.`)]});

        const args = interaction.options.getNumber("sayi");
    	const player = interaction.client.manager.get(interaction.guildId);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Oynatılan şarkı yok.");
           return await interaction.editReply({embeds: [thing]});
        }

       const position = (Number(args) - 1);
       if (position > player.queue.size) {
         const number = (position + 1);
         let thing = new MessageEmbed()
           .setColor("RED")
           .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.size}`);
          return await interaction.editReply({ embeds: [thing] });
       }
     
    const song = player.queue[position]
    player.queue.remove(position);

    const emojieject = client.emoji.remove;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setTimestamp()
      .setDescription(`${emojieject} Removed\n[${song.title}](${song.uri})`)
    return await interaction.editReply({ embeds: [thing] });
     
       }
     };
