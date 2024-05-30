const Discord = require('discord.js');
module.exports = {
  name: 'serverinfo',
  description: "send a info about server.",
  aliases: ['sinfo', 'server'],
  category: 'Member 👻',
  cooldown: 5,
  utilisation: 'serverinfo',

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    if (message.guild.verificationLevel === "NONE") {
      verification = "0";
    } else if (message.guild.verificationLevel === "LOW") {
      verification = "1";
    } else if (message.guild.verificationLevel === "MEDIUM") {
      verification = "2";
    } else if (message.guild.verificationLevel === "HIGH") {
      verification = "3";
    } else if (message.guild.verificationLevel === "VERY_HIGH") {
      verification = "4";
    }

    var rulesChannelID;
    if (message.guild.rulesChannelID === null) {
      var rulesChannelID = "**undefind :)**";
    } else {
      var rulesChannelID = `<#${message.guild.rulesChannelID}>`;
    }
    var afkChannelID;
    if (message.guild.afkChannelID === null) {
      var afkChannelID = "**undefind :)**";
    } else {
      var afkChannelID = `<#${message.guild.afkChannelID}>`;
    }
    let boosts = message.guild.premiumSubscriptionCount;
    var boostlevel = 0;
    if (boosts >= 2) boostlevel = "1";
    if (boosts >= 15) boostlevel = "2";
    if (boosts >= 30) boostlevel = "3 / ∞";
    let maxbitrate = 96000;
    if (boosts >= 2) maxbitrate = 128000;
    if (boosts >= 15) maxbitrate = 256000;
    if (boosts >= 30) maxbitrate = 384000;
    function epoch(date) {
      return Date.parse(date)
    }
    function trimArray(arr, maxLen = 25) {
      if (arr.array().length > maxLen) {
        const len = arr.array().length - maxLen;
        arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
        arr.map(role => `<@&${role.id}>`)
        arr.push(`${len} more...`);
      }
      return arr.join(", ");
    }
    await message.guild.members.fetch();
    function emojitrimarray(arr, maxLen = 20) {
      if (arr.length > maxLen) {
        const len = arr.length - maxLen;
        arr = arr.slice(0, maxLen);
        arr.push(`${len} more...`);
      }
      return arr.join(", ");
    }
    const dateToday = message.guild.createdAt;
    const ServerCreatedAt = epoch(dateToday) / 1000;
    let embed = new Discord.MessageEmbed()
      .setTimestamp()
      .setTitle("**Server Information**")
      .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField(`🎫| Name of Server:`, `**${message.guild.name}**`, true)
      .addField(`🆔| ID of Server:`, `**${message.guild.id}**`, true)
      .addField(`📅| Created at:`, `**<t:${ServerCreatedAt}:R>**`, true)
      .addField(`👑| Owner of Server:`, `${message.guild.owner}`, true)
      .addField(`🗺| Region of Server:`, `${message.guild.region}`, true)
      .addField(`👥| Total Members:`, `${message.guild.members.cache.size}`, true)
      .addField(`🤖| Total Bots:`, `${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
      .addField(`🚶| Total Humans:`, `${message.guild.members.cache.filter(member => !member.user.bot).size}`, true)
      .addField("🟢| ONLINE Users", "\`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
      .addField("⚫| OFFLINE Users", "\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)
      .addField(`😗| [${message.guild.emojis.cache.size}] Emojis:`, "" + message.guild.emojis.cache.size < 20 ? message.guild.emojis.cache.map(emoji => `${emoji}`).join(", ") : message.guild.emojis.cache.size > 20 ? emojitrimarray(message.guild.emojis.cache.map(emoji => `${emoji}`)).substr(0, 1024) : 'No Emojis', true)
      .addField(`👻| Emojis Animated:`, `${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`, true)
      .addField(`📖| All Channel:`, `${message.guild.channels.cache.size}`, true)
      .addField(`💬| Channel of text:`, `${message.guild.channels.cache.filter(channel => channel.type === 'text').size}`, true)
      .addField(`🔊| Channel of voice:`, `${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`, true)
      .addField(`🎤| Voice Joined Count:`, `${message.guild.voiceStates.cache.size}`, true)
      .addField(`💻| Verification Level:`, `${verification}`, true)
      .addField(`✨| Server Total Boosts:`, `${boosts}`, true)
      .addField(`🎊| Server Boosts Level:`, `${boostlevel}`, true)
      .addField(`🎚| Max Talk Bitrate:`, `${maxbitrate} kbps`, true)
      .addField(`👔| [${message.guild.roles.cache.size}] Roles: `, "" + message.guild.roles.cache.size < 25 ? message.guild.roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : 'None', true)
      .addField(`📊| Server Rules: `, `Rules: ${rulesChannelID} `)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
    message.channel.send(embed);
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