const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
  name: 'facebook',
  category: 'Link',



  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {



    try {
      if (!args[0]) return message.reply("<:Facebook:1222643370724294696>** : [Facebook](https://www.facebook.com/shirayukichan21)**");
      let comment = args.slice().join(" ");
      return message.channel.send(new (require("discord.js")).MessageAttachment(encodeURI(`https://some-random-api.ml/canvas/tweet?username=${message.author.username}&comment=${comment}&avatar=${message.author.displayAvatarURL({ format: "png" })}&displayname=${message.member.displayName}`), "tweet-SizarTeam.png"));

    } catch (_) {
      console.log(_);
      return message.channel.send("Gagal");

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