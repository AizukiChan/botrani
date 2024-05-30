module.exports = {
  name: "voicekick",
  cooldown: 5,
  aliases: ["vki"],
  category: 'Moderation 🗿',
  utilisation: 'voicekick',
  description: "Kicks a member from the voice",
  usage: "[name | nickname | mention | ID] <reason> (optional)",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Discord = require('discord.js');
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "No Permi"
      );

    if (!message.mentions.members.first())
      return message.channel.send(
        `Lotfan Member Ke Mikhahid Az Voice Kik Konid Ra Mention Konid `
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.channel.send(`Member Tidak Berada Di Dalam Voice ❌`);

    message.mentions.members.first().voice.kick();

    message.channel.send(`Member Telah Berhasil Di Kick Dari Voice ✅`)
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */