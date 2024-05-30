module.exports = {
  name: "ban",
  cooldown: 5,
  aliases: ["bn"],
  category: 'Moderation 🗿',
  utilisation: 'ban [name | nickname | mention | ID] [reason]',
  description: "Ban a member from the server.",

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
    let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

    if (!member) return message.channel.send(`**Please Mention A User**`);
    if (member.id === message.author.id) return message.channel.send('**Njir Mana Bisa Ban Diri Sendiri**');

    if (!member) return message.channel.send('❌ **User not found**');

    let reason = args.join(" ").slice(22);
    if (!reason) reason = "No Reason Specified";

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('❌ **You can not use this command**')
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('❌ **I do not have the correct permissions**')

    message.react('✅')

    let e = new Discord.MessageEmbed()
      .setTitle('User has been banned')
      .setColor("RANDOM")
      .addField('Username', `**${member}**`)
      .addField('Banned by', `**${message.author}**`)
      .addField('Reason', `**${reason}**`)
      .setFooter('Ban time', client.user.displayAvatarURL())
      .setTimestamp()


    let userE = new Discord.MessageEmbed()
      .setTitle(`You've Been Banned From **${message.guild.name}**`)
      .setColor("RANDOM")
      .addField('Mod', `**${message.author}**`)
      .addField('Reason', `**${reason}**`)
      .setTimestamp(new Date())

    message.guild.member(member).ban({ reason: reason })
    member.send(userE);

    let mChannel = await db.get(`modlog_${message.guild.id}`)
    if (!mChannel) return message.channel.send(e)
    let banChannel = message.guild.channels.cache.get(mChannel)
    if (!banChannel) return;
    banChannel.send(e)
  },
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */