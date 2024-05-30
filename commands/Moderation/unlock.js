module.exports = {
  name: "unlock",
  cooldown: 5,
  aliases: ["ulo"],
  category: 'Moderation 🗿',
  utilisation: 'unlock',
  description: "Unlock a member from the server",
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
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("❌ **You can not use this command | Permission: MANAGE_CHANNELS**")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('❌ **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')

    let msg = await message.channel.send("**Please wait**")
    function epoch(date) {
      return Date.parse(date)
    }
    const dateToday = new Date();
    const TimeStampDate = epoch(dateToday) / 1000;
    try {
      message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
        SEND_MESSAGES: true,
        ADD_REACTIONS: true
      })
      msg.edit(`${client.emotes.success} **Successfully unlocked the channel**`)
      let embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.id + '|' + message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setTitle(`${client.emotes.error} | Yek Channel Unlock Shod`)
        .setColor("#2F3136")
        .setTimestamp()
        .setFooter("Created By Ranii :)", `https://cdn.discordapp.com/attachments/1223224422731616417/1224822468309549208/unha.png?ex=661ee3d0&is=660c6ed0&hm=3c9a8b6b4480c29eff7c7cfb22ccba0adeaaa03825bbe3d4b6608b4cb8318e31&`)
        .addField(`Channele Zir Unlock Shod: `, message.channel, true)
        .addField(`Tavasote : `, message.author, true)
        .addField(`Dar Tarikhe : `, `<t:${TimeStampDate}:R>`, true);
      let logChannel = await client.db.get(`modlog_${message.guild.id}`)
      let logsChannel = message.guild.channels.cache.get(logChannel)
      if (!logsChannel) return;
      logsChannel.send(embed)
    } catch (e) {
      console.log(e)
    }
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