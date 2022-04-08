
const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const load = require('lodash');
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "sıra",
    category: "Music",
    aliases: "sıra",
    description: "Sıradaki şarkılara bakarsınız.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.get(message.guild.id);
        const queue = player.queue;
        if (!player) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`Oynatılan şarkı yok.`)] });

        if (!player.queue) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`Oynatılan şarkı yok.`)] });

        if (player.queue.length === "0" || !player.queue.length) {
            const embed = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`Şuanda [${player.queue.current.title}](${player.queue.current.uri}) oynatılıyor. • \`[${convertTime(queue.current.duration)}]\` • [${player.queue.current.requester}]`)

            await message.channel.send({
                embeds: [embed]
            }).catch(() => { });
        } else {
            const queuedSongs = player.queue.map((t, i) => `\`${++i}\` • ${t.title} • \`[${convertTime(t.duration)}]\` • [${t.requester}]`);

            const mapping = load.chunk(queuedSongs, 10);
            const pages = mapping.map((s) => s.join("\n"));
            let page = 0;

            if (player.queue.size < 11) {
                const embed = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`**Şuanda oynatılan**\n > [${player.queue.current.title}](${player.queue.current.uri}) • \`[${convertTime(queue.current.duration)}]\`  • [${player.queue.current.requester}]\n\n**Sıradaki şarkılar**\n${pages[page]}`)
                    .setTimestamp()
                    .setFooter({ text: `Sayfa ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(player.queue.current.thumbnail)
                    .setTitle(`${message.guild.name} adlı sunucunun sırası`)

                await message.channel.send({
                    embeds: [embed]
                })
            } else {
                const embed2 = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`**ŞUanda oynatılan**\n > [${player.queue.current.title}](${player.queue.current.uri}) • \`[${convertTime(queue.current.duration)}]\` • [${player.queue.current.requester}]\n\n**Sıradaki şarkılar**\n${pages[page]}`)
                    .setTimestamp()
                    .setFooter({ text: `${message.author.tag} tarafından istendi.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(player.queue.current.thumbnail)
                    .setTitle(`${message.guild.name} adlı sunucunun sırası`)

                const but1 = new MessageButton()
                    .setCustomId("queue_cmd_but_1")

                    .setEmoji("⏭")
                    .setStyle("PRIMARY")

                const but2 = new MessageButton()
                    .setCustomId("queue_cmd_but_2")
                    .setEmoji("⏮")
                    .setStyle("PRIMARY")

                const but3 = new MessageButton()
                    .setCustomId("queue_cmd_but_3")
                    .setLabel(`${page + 1}/${pages.length}`)
                    .setStyle("SECONDARY")
                    .setDisabled(true)

                const row1 = new MessageActionRow().addComponents([
                    but2, but3, but1
                ]);

                const msg = await message.channel.send({
                    embeds: [embed2],
                    components: [row1]
                })

                const collector = message.channel.createMessageComponentCollector({
                    filter: (b) => {
                        if (b.user.id === message.author.id) return true;
                        else {
                            b.reply({
                                ephemeral: true,
                                content: `Sadece **${message.author.tag}** bunu isterseniz, komutu tekrar çalıştırmanız gerekir..`
                            });
                            return false;
                        };
                    },
                    time: 60000 * 5,
                    idle: 30e3
                });

                collector.on("collect", async (button) => {
                    if (button.customId === "queue_cmd_but_1") {
                        await button.deferUpdate().catch(() => { });
                        page = page + 1 < pages.length ? ++page : 0;

                        const embed3 = new MessageEmbed()
                            .setColor(client.embedColor)
                            .setDescription(`**Şuanda oynatılan**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[${convertTime(queue.current.duration)}]\` • [${player.queue.current.requester}]\n\n**Sıradaki şarkılar**\n${pages[page]}`)
                            .setTimestamp()
                            .setFooter({ text: `${message.author.tag} tarafından istendi.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                            .setThumbnail(player.queue.current.thumbnail)
                            .setTitle(`${message.guild.name} adlı sunucunun sırası`)

                        await msg.edit({
                            embeds: [embed3],
                            components: [new MessageActionRow().addComponents(but2, but3.setLabel(`${page + 1}/${pages.length}`), but1)]
                        })
                    } else if (button.customId === "queue_cmd_but_2") {
                        await button.deferUpdate().catch(() => { });
                        page = page > 0 ? --page : pages.length - 1;

                        const embed4 = new MessageEmbed()
                            .setColor(client.embedColor)
                            .setDescription(`**Şuanda oynatılan**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[${convertTime(queue.current.duration)}]\` • [${player.queue.current.requester}]\n\n**Sıradaki şarkılar**\n${pages[page]}`)
                            .setTimestamp()
                            .setFooter({ text: `${message.author.tag} tarafından istendi.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                            .setThumbnail(player.queue.current.thumbnail)
                            .setTitle(`${message.guild.name} adlı sunucunun sırası`)

                        await msg.edit({
                            embeds: [embed4],
                            components: [new MessageActionRow().addComponents(but2, but3.setLabel(`Page ${page + 1}/${pages.length}`), but1)]
                        }).catch(() => { });
                    } else return;
                });

                collector.on("end", async () => {
                    await msg.edit({
                        components: []
                    })
                });
            }
        }
    }
};
