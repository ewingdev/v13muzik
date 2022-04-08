const { MessageEmbed, Permissions } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: "oynat",
  category: "Music",
  aliases:  "oynat",
  description: "Youtube, SoundCloud ve Spotify plartformundan şarkı aratır ve oynatır",
  args: true,
  usage: "<YouTube URL | Video Name | Spotify URL>",
  permission: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {

    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetkim yok. \`CONNECT\` ve \`SPEAK\`  yetkisi lazım.`)] });

    const { channel } = message.member.voice;

    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Yetkim yok. \`CONNECT\` ve \`SPEAK\`  yetkisi lazım.`)] });

    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist

    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
      volume: 80,
    });

    if (player.state != "CONNECTED") await player.connect();
    const search = args.join(' ');
    let res;

    try {
      res = await player.search(search, message.author);
      if (!player)
        return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription("Şu anda hiçbir şey oynamıyor...")] });
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(`there was an error while searching: ${err.message}`);
    }
    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`${search} aramasından eşleşme bulunamadı.`)] });
      case 'TRACK_LOADED':
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail("hqdefault"))
            .setDescription(`${emojiaddsong} \n[${track.title}](${track.uri}) **adlı şarkı sıraya eklendi** - \`[${convertTime(track.duration)}]\``)
          return message.channel.send({ embeds: [thing] });
        }
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);
        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
        const thing = new MessageEmbed()
          .setColor(client.embedColor)
          .setTimestamp()
          .setDescription(`${emojiplaylist} **Çalma listesine eklendi**\n${res.tracks.length} şarkı [${res.playlist.name}](${search}) - \`[${convertTime(res.playlist.duration)}]\``)
        return message.channel.send({ embeds: [thing] });
      case 'SEARCH_RESULT':
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail("hqdefault"))
            .setDescription(`${emojiaddsong} **Çalma listesine eklendi**\n[${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\`[<@${track.requester.id}>]`)
          return message.channel.send({ embeds: [thing] });
        }
    }
  }
}