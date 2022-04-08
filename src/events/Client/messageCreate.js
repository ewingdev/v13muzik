const { MessageEmbed, Permissions } = require("discord.js");
const db = require("../../schema/prefix.js");

module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
   
   if (message.author.bot) return;
   if (!message.guild) return;
    let prefix = client.prefix;
    const channel = message?.channel;
    const ress =  await db.findOne({Guild: message.guildId})
   if(ress && ress.Prefix)prefix = ress.Prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**› Bu sunucudaki prefixim \`${prefix}\`**\n**› Bütün komutlarımı görmek için \`${prefix}\`yardım \`/yardım \`**`);
      message.channel.send({embeds: [embed]})
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `Yetkin yok dostum **\`SEND_MESSAGES\`** yetkin olması lazım.\n Yetkin olduğu zaman yeniden **\`${command.name}\`** komutunu deneyebilirsin.` }).catch(() => {});

    if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send({ content: `Yetkin yok **\`EMBED_LINKS\`** yetkin olması lazım\n Yetkin olduğu zaman yeniden **\`${command.name}\`** komutunu kullan.` }).catch(() => {});
    
    const embed = new MessageEmbed()
        .setColor("RED");

    // args: true,
    if (command.args && !args.length) {
        let reply = `Herhangi bir argüman sağlamadın, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
        	reply += `\nÖrnek: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send({embeds: [embed]});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("Komutu kullanamazsın.");
        return message.channel.send({embeds: [embed]});
    }
   if (!channel.permissionsFor(message.guild.me)?.has(Permissions.FLAGS.EMBED_LINKS) && client.user.id !== userId) {
        return channel.send({ content: `Hata! \`EMBED_LINKS\` yetkim yok.` });
      }
    if (command.owner && message.author.id !== `${client.owner}`) {
        embed.setDescription("Sadece <@774591026940739585> yanii sahibim kullanabilir!");
        return message.channel.send({embeds: [embed]});
    }

    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setDescription("Sesli kanalda kimse yok.");
        return message.channel.send({embeds: [embed]});
    }

    if (command.inVoiceChannel && !message.member.voice.channelId) {
        embed.setDescription("Sesli kanala bağlan!");
        return message.channel.send({embeds: [embed]});
    }

    if (command.sameVoiceChannel) {
    if(message.guild.me.voice.channel) {
        if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
            embed.setDescription(`Aynı kanalda olmalısınız ${message.client.user}!`);
            return message.channel.send({embeds: [embed]});
        }
    }
}

    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("Hata almaya devam ediyorum...\nLütfen **kurucuma** ulaşın yada **destek sunucuma** ulaşın.");
        return message.channel.send({embeds: [embed]});
    }
  }
};
