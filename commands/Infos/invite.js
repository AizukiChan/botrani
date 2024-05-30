const {
  MessageEmbed
} = require("discord.js");
const {
  MessageButton,
  MessageActionRow
} = require('discord-buttons');
module.exports = {
  name: "invite", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: ["in"], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  utilisation: 'invite',
  description: "neshan dadane link invite (davate) bot.", //the command description for helpcmd [OPTIONAL]

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    try {
      let inviteEmbed = new MessageEmbed()
      inviteEmbed.setAuthor(`Requested by ${message.author.username}`, `${message.author.displayAvatarURL()}`)
      inviteEmbed.setThumbnail(message.client.user.displayAvatarURL({ format: "png" }))
      inviteEmbed.setTitle(`Invite lah bot ini ke server anda ${client.user.username}`)
      inviteEmbed.setDescription(`**Gunakan lah bot ini dengan bijak \n\n [Invite Link](${client.config.discord.invite})**`)
      inviteEmbed.setURL(client.config.discord.server_support)
      inviteEmbed.setFooter("Link Server Support Di Atas :)", `https://cdn.discordapp.com/attachments/1222652195464417320/1224798900238422267/unha.png?ex=661ecddd&is=660c58dd&hm=3c81f298e5adfc7fa7502b1d9c207471080f9a249ca86a7b2e35e7b61ed048ce&`)
      inviteEmbed.setColor("#2F3136")
      function Invite() {
        const btn1 = new MessageButton()
          .setStyle('url')
          .setLabel('Invite Me')
          .setEmoji('🤖')
          .setURL(client.config.discord.invite.replace("{clientId}", client.user.id) || `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=137775017040&scope=bot%20applications.commands`)

        const btn2 = new MessageButton()
          .setStyle('url')
          .setLabel('Support Server!')
          .setEmoji('🧰')
          .setURL(`${client.config.discord.server_support || "https://discord.gg/uY6zSGkwu6"}`)

        const row = new MessageActionRow()
          .addComponents(btn1, btn2)

        return row;
      }
      message.channel.send({ components: [Invite()], embed: inviteEmbed });
    } catch (e) {
      function NeedHelpButtons() {
        const btn1 = new MessageButton()
          .setStyle('url')
          .setLabel('Invite Me')
          .setEmoji('🤖')
          .setURL(client.config.discord.invite)

        const btn2 = new MessageButton()
          .setStyle('url')
          .setLabel('Support Server!')
          .setEmoji('🧰')
          .setURL(`${client.config.discord.server_support || "https://dsc.gg/persian-caesar"}`)

        const row = new MessageActionRow()
          .addComponents(btn1, btn2)

        return row;
      }
      console.log(e)
      return message.channel.send(`${client.emotes.error} **| Error, ${e}**`).then(message.author.send(`Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${client.config.discord.server_support || "https://dsc.gg/persian-caesar"}`, { components: [NeedHelpButtons()] }));
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