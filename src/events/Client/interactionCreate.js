const { MessageEmbed, Client } = require("discord.js")
const pre= require("../../schema/prefix.js");

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
   
    let prefix = client.prefix;
    const ress =  await pre.findOne({Guild: interaction.guildId})
    if(ress && ress.Prefix)prefix = ress.Prefix;
     
     if(interaction.isCommand()) {

        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
        
        if (SlashCommands.owner && interaction.author.id !== `${client.owner}`) {
          await interaction.editReply({
          content: `Sadece <@774591026940739585> yanii sahibim kullanabilir!`
        }).catch(() => {});
        }
        const player = interaction.client.manager.get(interaction.guildId);

        if (SlashCommands.player && !player) {
          await interaction.editReply({
                    content: `Sesli kanalda kimse yok.`
                }).catch(() => {});
        }
        if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) { 
          await interaction.editReply({
          content: `Sesli kanalda değilsin!`
        }).catch(() => {});
        }
        if (SlashCommands.sameVoiceChannel && interaction.member.voice.channel !== interaction.guild.me.voice.channel) { 
           await interaction.editReply({
                    content: `Aynı kanalda olmalısınız ${interaction.client.user}`
                }).catch(() => {}); 
         }
                
        try {
            await SlashCommands.run(client, interaction, prefix);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `Hata aldım lütfen destek sunucuma iletin.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `Hata aldım lütfen destek sunucuma iletin.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
  }    
};