const { CommandInteraction, Client, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const { convertTime } = require('../../utils/convert.js');
module.exports = {
  name: "oynat",
  description: "Yazdığınız şarkının ismini youtubede ve soundcloudda aratır oynatır.",
  options: [
    {
      name: "input",
      description: "Şarkı aratın (şarkı ismi/url)",
      required: true,
      type: "STRING"
    }
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction,) => {
    await interaction.deferReply({
      ephemeral: false
    });
    if (!interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetkim bulunmamakta \`CONNECT\` ve \`SPEAK\`.`)] });
    const { channel } = interaction.member.voice;
    if (!interaction.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetkim bulunmamakta \`CONNECT\` ve \`SPEAK\`.`)] });
    if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Sesli kanala bağlan sonra yeniden dene")] });
    if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`<#${interaction.guild.me.voice.channelId}> yeniden dene.`)] });

    const emojiaddsong = client.emoji.addsong;
    const emojiplaylist = client.emoji.playlist;
    let search = interaction.options.getString("input");
    let res;

    let player = client.manager.create({
      guild: interaction.guildId,
      textChannel: interaction.channelId,
      voiceChannel: interaction.member.voice.channelId,
      selfDeafen: true,
      volume: 100
    });

    if (player.state != "CONNECTED") await player.connect();

    try {
      res = await player.search(search);
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`:x: | **Arattığınız şarkı bulunamadı**`)] });
      }
    } catch (err) {
      console.log(err)
    }
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return await interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription("❌ | **Şarkı bulunamadı.**")] });
      case "TRACK_LOADED":
        player.queue.add(res.tracks[0], interaction.user);
        if (!player.playing && !player.paused && !player.queue.length)
          player.play();
        const trackload = new MessageEmbed()
          .setColor(client.embedColor)
          .setTimestamp()
          .setDescription(`${emojiplaylist} **Şarkı sıraya eklendi!** [${res.tracks[0].title}](${res.tracks[0].uri}) - \`[${convertTime(res.tracks[0].duration)}]\``);
        return await interaction.editReply({ embeds: [trackload] });
      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);
        await player.play();

        const playlistloadds = new MessageEmbed()
          .setColor(client.embedColor)
          .setTimestamp()
          .setDescription(`${emojiplaylist} **Şarkı sıraya eklendi!** [${res.playlist.name}](${search}) - \`[${convertTime(res.playlist.duration)}]\``);
        return await interaction.editReply({ embeds: [playlistloadds] });
      case "SEARCH_RESULT":
        const track = res.tracks[0];
        player.queue.add(track);

        if (!player.playing && !player.paused && !player.queue.length) {
          const searchresult = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail("3"))
            .setDescription(`${emojiplaylist} **Şarkı sıraya eklendi!** [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]`);

          player.play();
          return await interaction.editReply({ embeds: [searchresult] });

        } else {
          const thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail("3"))
            .setDescription(`${emojiplaylist} **Şarkı sıraya eklendi!** [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\``);

          return await interaction.editReply({ embeds: [thing] });

        }
    }
  }
}

