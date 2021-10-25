const { MessageEmbed, Client, User, ReactionCollector } = require('discord.js');
const db = require('quick.db');
const emojis = require('../../config/emojis.json');
const { player } = require('../index');
const colors = require('../../config/colors.json');
/**
 * 
 * @param {Client} client 
 * @param {ReactionCollector} reaction 
 * @param {User} user 
 */

module.exports = async (client, reaction, user) => {
  let data = db.fetch(`SeTupInFo_${reaction.message.guild.id}`);
  if (data !== null) {
    if (user.bot) return;
    if (reaction.message.id == data.msgID) {
      if (!reaction.message.guild.members.cache.get(user.id).voice.channel) reaction.message.channel.send({ content: emojis.error + ' | please join a voice channel first!' });
      // if (reaction.message.guild.me.voice.channel !== reaction.message.guild.members.cache.get(user.id).voice.channel) reaction.message.channel.send({ content: emojis.error + ' | you must join an same voice channel iam in <#' + reaction.message.guild.me.voice.channel.id + '>!' });
      let queue = player.getQueue(reaction.message);
      if (reaction.emoji.name == "⏯️") {
        try {
          reaction.users.remove(user.id)
          if (queue) {
            if (queue.paused == true) player.resume(reaction.message)
            else player.pause(reaction.message)
          }
        } catch {
          console.log('')
        }
      } else if (reaction.emoji.name == "⏹️") {
        try {
          reaction.message.edit({
            embeds: [
              new MessageEmbed()
                .setAuthor("No song playing currently")
                .setColor(colors.error)
                .setImage("https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
            ],
          });
          reaction.users.remove(user.id)
          player.stop(reaction.message)
        } catch {
          console.log('')
        }
      } else if (reaction.emoji.name == "⏭️") {
        try {
          reaction.users.remove(user.id)
          if (queue) {
            if (queue.songs.map((song, i) => i).length == 1) {
              player.stop(reaction.message)
              reaction.message.edit({
                embeds: [
                  new MessageEmbed()
                    .setAuthor("No song playing currently")
                    .setColor(colors.error)
                    .setImage("https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
                ],
              });
            }
            setTimeout(() => {
              reaction.message.edit({
                embeds: [
                  new MessageEmbed()
                    .setAuthor(require('../music/playSong').song.name || "No song playing currently")
                    .setColor(colors.error)
                    .setImage(require('../music/playSong').song.thumbnail || "https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
                ],
              });
            }, 2000);
            player.skip(reaction.message)
          }
        } catch {
          console.log('')
        }
      } else if (reaction.emoji.name == "🔄") {
        try {
          reaction.users.remove(user.id)
          if (queue) {
            if (queue.repeatMode == 0) player.setRepeatMode(reaction.message, parseInt(1))
            if (queue.repeatMode == 1) player.setRepeatMode(reaction.message, parseInt(0))
          }
        } catch {
          console.log('')
        }
      } else if (reaction.emoji.name == "🔀") {
        try {
          reaction.users.remove(user.id)
          if (queue) {
            player.shuffle(reaction.message)
          }
        } catch {
          console.log('')
        }
      } else if (reaction.emoji.name == "🔉") {
        try {
          reaction.users.remove(user.id)
          if (queue) {
            let vol = queue.volume;
            player.setVolume(reaction.message, Number(vol) - 10)
          }
        } catch {
          console.log('')
        }
      } else if (reaction.emoji.name == "🔊") {
        try {
          reaction.users.remove(user.id)
          if (queue) {
            let vol = queue.volume;
            player.setVolume(reaction.message, Number(vol) + 10)
          }
        } catch {
          console.log('')
        }
      }
    }
  }
};