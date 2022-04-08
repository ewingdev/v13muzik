const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "botun pingine bakarsınız",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
  await message.reply({ content: "Pinging..." }).then(async (msg) => {
  const ping = msg.createdAt - message.createdAt;
  const api_ping = client.ws.ping;

  const PingEmbed = new MessageEmbed()
    .setAuthor({ name: "Pong", iconURL: client.user.displayAvatarURL()})
    .setColor(client.embedColor)
    .addField("Bot pingi", `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, true)
    .addField("API pingi", `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, true)
    .setFooter({ text: `${message.author.username} tarafından istendi`, iconURL:  message.author.avatarURL({ dynamic: true })})
    .setTimestamp();

  await msg.edit({
    content: "\`🏓\`",
    embeds: [PingEmbed]
  })
 })
 }
}