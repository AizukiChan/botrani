module.exports = {
  name: "kick",
  cooldown: 5,
  aliases: ["ki"],
  category: 'Moderation 🗿',
  utilisation: 'kick',
  description: "Kicks a member from the server",
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
    const db = client.db;
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('❌ **You can not use this command **')
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('❌ **I do not have the correct permissions**')

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!args[0]) return message.channel.send('❌ **Please specify a user**');

    if (!member) return message.channel.send('❌ **User not found**');
    if (!member.kickable) return message.channel.send('❌ **I can not kick this user. Either because they are the mod / admin, or their role is higher than mine**');

    if (member.id === message.author.id) return message.channel.send('**Jir mana bisa ngekick diri sendiri, aneh betul kamu**');

    let reason = args.slice(1).join(" ");

    if (reason === undefined) reason = 'not defined';

    member.kick(reason)
      .catch(err => {
        if (err) return message.channel.send(err)
      })

    message.react('✅')

    const kickembed = new Discord.MessageEmbed()
      .setTitle('User has been kicked')
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(client.colors.none)
      .addField('Username', `**${member}**`)
      .addField('Kicked by', `**${message.author}**`)
      .addField('Reason', `**${reason}**`)
      .setFooter('Kick time', client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(kickembed)

    let logChannel = await db.get(`modlog_${message.guild.id}`)
    let logsChannel = message.guild.channels.cache.get(logChannel)
    if (!logsChannel) return;
    logsChannel.send(kickembed)


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