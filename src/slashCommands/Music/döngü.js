const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "döngü",
    description: "Müziği yada sırayı döngüya alır",
         options: [
           {
             name: "input",
             description: "Hangisini döngüye alayım? (şarkıyı, sırayı)",
             type: "STRING",
             required: true,
             choices: [
               {
                 name: "şarkı",
                 value: "şarkı"
                        },
               {
                 name: "sıra",
                 value: "sıra"
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
        if (!interaction.replied) await interaction.deferReply().catch(() => {});
        if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("Sesli kanalda yoksun :c")]});
        if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> komutu yeniden dene.`)]});

       const input = interaction.options.getString("input");
    
        let player = client.manager.get(interaction.guildId);
          if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Oynatılan şarkı bulunmamakta.");
            return message.channel.send({embeds: [thing]});
        }
	  	  const emojiloop = client.emoji.loop;
	  	  
        if(input === "şarkı") {
            if(player.trackRepeat) {
                player.setTrackRepeat(false);
            return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Şarkı dögüsü iptal edildi`)]})   
            } else {
            player.setTrackRepeat(true);
            return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Şarkı dögüsü aktif edildi`)]})
          }
        } else if(input === "sıra") {
            if(!player.queue.size) return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Döngü için sırayla daha fazla şarkı yok`)]})
         if(player.queueRepeat) {
                player.setQueueRepeat(false);
            return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Sıra döngüsü iptal edildi`)]})
          } else {
          player.setQueueRepeat(true);
          return await interaction.editReply({
              embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojiloop} Sıra döngüsü aktif edildi`)]})
          };
       }
    }
};
