module.exports = {
  name: "mute",
  cooldown: 5,
  aliases: ["mu"],
  category: 'Moderation 🗿',
  utilisation: 'mute [name | nickname | mention | ID] <duration> <reason> (optional)',
  description: "Mutes a member in the server with a specified duration",
  usage: "[name | nickname | mention | ID] <duration> <reason> (optional)",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    const Discord = require('discord.js');
    const ms = require('ms');
    const db = client.db;
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('❌ **You can not use this command**')
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('❌ **I do not have the correct permissions**')

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!args[0]) return message.channel.send('❌ **Please specify a user**');

    if (!member) return message.channel.send('❌ **User not found**');
    if (!member.manageable) return message.channel.send('❌ **I cannot mute this user. Either because they are the mod/admin, or their role is higher than mine**');

    if (member.id === message.author.id) return message.channel.send('**You cannot mute yourself**');

    let duration = args[1];
    let reason = args.slice(2).join(" ");

    if (!duration || !ms(duration)) return message.channel.send('❌ **Please specify a valid duration**');
    if (reason === undefined) reason = 'not defined';

    let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

    if (!mutedRole) {
      try {
        mutedRole = await message.guild.roles.create({
          data: {
            name: 'Muted',
            color: '#000000',
            permissions: []
          }
        });

        message.guild.channels.cache.forEach(async (channel) => {
          await channel.updateOverwrite(mutedRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false
          });
        });
      } catch (err) {
        console.log(err);
        return message.channel.send('❌ **There was an error creating the muted role**');
      }
    }

    await member.roles.add(mutedRole.id).catch(err => {
      console.log(err);
      return message.channel.send('❌ **There was an error giving the muted role to the user**');
    });

    const muteEmbed = new Discord.MessageEmbed()
      .setTitle('User has been muted')
      .setThumbnail(member.user.displayAvatarURL())
      .setColor(client.colors.none)
      .addField('Username', `**${member}**`)
      .addField('Muted by', `**${message.author}**`)
      .addField('Duration', `**${duration}**`)
      .addField('Reason', `**${reason}**`)
      .setFooter('Mute time', client.user.displayAvatarURL())
      .setTimestamp();
    message.channel.send(muteEmbed);

    let logChannel = await db.get(`modlog_${message.guild.id}`);
    let logsChannel = message.guild.channels.cache.get(logChannel);
    if (logsChannel) logsChannel.send(muteEmbed);

    setTimeout(() => {
      member.roles.remove(mutedRole.id).catch(err => {
        console.log(err);
        return message.channel.send('❌ **There was an error removing the muted role from the user**');
      });
      message.channel.send(`✅ **${member.user.tag} has been unmuted after ${duration}**`);
    }, ms(duration));
  }
}
