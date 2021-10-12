const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "shuffle",
    description: "Randomizes the queue",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        if (lang == "en") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            player.shuffle(interaction);
            interaction.followUp({ content: "🔀 | **server queue has shuffled**", allowedMentions: false, ephemeral: true });
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.shuffle(interaction);
            interaction.followUp({ content: "🔀 | **تمت اعادة ترتيب قائمة التشغيل**", allowedMentions: false, ephemeral: true });
        }
    },
};