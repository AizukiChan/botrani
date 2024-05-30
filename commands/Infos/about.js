const moment = require("moment");
const Discord = require("discord.js");
const os = require("os");
const axios = require("axios");
const {
  MessageEmbed
} = require("discord.js");
const {
  MessageButton,
  MessageActionRow
} = require('discord-buttons');
const cpuStat = require("cpu-stat");
module.exports = {
  name: 'about',
  aliases: ['info'],
  category: 'Infos 📊',
  utilisation: 'about',
  description: 'send info of bot for know about bot.',


  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {
    try {
      const statuses = {
        "online": "🟢",
        "idle": "🟠",
        "dnd": "🔴",
        "offline": "⚫️",
      }
      const activity = message.client.user.presence.activities[0];
      var userstatus = "Not Having An Activity";
      if (activity) {
        if (activity.type === "CUSTOM_STATUS") {
          let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
          userstatus = `${emoji} \`${activity.state || 'Not Having An Acitivty.'}\``
        }
        else {
          userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
        }
      }
      function epoch(date) {
        return Date.parse(date)
      }
      let seconds = Math.floor(client.uptime / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);
      seconds %= 60;
      minutes %= 60;
      hours %= 24;
      var createdAtDate = epoch(message.client.user.createdAt) / 1000;
      var joinedAtDate = epoch(message.joinedAt) / 1000;
      cpuStat.usagePercent(function (e, percent) {
        if (e) {
          return console.log(String(e.stack).red);
        }
        let connectedchannelsamount = 0;
        let guilds = client.guilds.cache.map((guild) => guild);
        for (let i = 0; i < guilds.length; i++) {
          if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
        }
        if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
        let infoEmbed = new MessageEmbed()
          .setColor(client.colors.none)
          .setTitle(`Stats from \`${client.user.tag}\``)
          .addField(`🆔| ID:`, `<:Discord:1224309480171245621>** Pemilik Bot:\n Khadafia Rani**`, true)
          .addField(`🥋| Tag:`, `<:Discord:1224309480171245621>**${client.user.tag}**`, true)
          .addField(":ping_pong:| Ping", `**<:Discord:1224309480171245621> User Ping Is: \`${Math.round(client.ws.ping)}MS\`**`, true)
          .addField(":clock1:| Uptime", `<:Discord:1224309480171245621>** Time Of Bot Online: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`** || \`${moment.duration(client.uptime)}\``, true)
          .addField(`✨| Status:`, `<:Discord:1224309480171245621>** Bot Status Is: ${statuses[message.client.user.presence.status]} ${client.user.presence.status}**`, true)
          .addField('🎬| Activity:', `<:Discord:1224309480171245621>** Bot Activity Is: ${userstatus}**`, true)
          .addField(`📅| Date of Join Discord:`, `<:Discord:1224309480171245621>** Time Of Bot Created: <t:${createdAtDate}:R>**`, true)
          .addField(`📈| Date of Join Server:`, `<:Discord:1224309480171245621>** Time Of Bot Join Server: <t:${joinedAtDate}:R>**`, true)
          .addField(":file_cabinet:| Memory Usage", `<:Discord:1224309480171245621>** Bot Usage Memory Is: \`\`32000.76MB\`\`**`, true)
          .addField(":busts_in_silhouette:| Usage Users", `<:Discord:1224309480171245621>** Count Of Usage Users Is: \`${client.users.cache.size}\`**`, true)
          .addField(":homes:| Servers", `<:Discord:1224309480171245621>** Count Of Bot Servers Is: \`${client.guilds.cache.size}\`**`, true)
          .addField("🎙️| Voice Channels", `<:Discord:1224309480171245621>** Count Of Bot Voice Channel Is: \`${client.channels.cache.filter((ch) => ch.type === "voice").size}\`**`, true)
          .addField("💬| Text Channels", `<:Discord:1224309480171245621>** Count Of Bot Text Channel Is: \`${client.channels.cache.filter((ch) => ch.type === "text").size}\`**`, true)
          .addField("🎤| Connected Channels", `<:Discord:1224309480171245621>** Count Of Bot Joined Voices Is: \`${connectedchannelsamount}\`**`, true)
          .addField(":control_knobs: API Latency", `<:Discord:1224309480171245621>** Bot API Latency Is: \`${message.client.ws.ping}MS\`**`, true)
          .addField(":robot: Version", `<:Discord:1224309480171245621>** Bot Version Is: \`Omega 5.2.1\`**`, true)
          .addField(":blue_book: Discord.js", `<:Discord:1224309480171245621>** Bot Usage Discord.js Version Is: \`Version ${Discord.version}\`**`, true)
          .addField(":green_book: Node.js", `<:Discord:1224309480171245621>** Bot Usage Node.js Version Is: \`Version ${process.version}\`**`, true)
          .addField("📡| CPU User", `<:Discord:1224309480171245621>** Bot Usage CPU Model Is: \`\`\`Model\nIntel(R)\nCore(TM) I9-\n14900K CPU @\n5.7GHz\`\`\`**`, true)
          .addField("🖥| CPU Usage", `<:Discord:1224309480171245621>** Bot Percent Of Usage CPU Is: \`\`\`${percent.toFixed(2)}%\`\`\`**`, true)
          .addField("🧵| Shards", `<:Discord:1224309480171245621>** Bot Shards Percent Is: \`${client.ws.shards.size}%\`**`, true)
          .addField("👔| Cores", `<:Discord:1224309480171245621>** Bot Cores Percent Is: \`${os.cpus().length}%\`**`, true)
          .addField("🧥| Architecture", `<:Discord:1224309480171245621>** Bot Architecture Is: \`${os.arch()}\`**`, true)
          .addField("🕹| Platform", `<:Discord:1224309480171245621>** Bot Usage Platform Is: Windows \`**`, true)
          .addField("🧰| Commands Count", `<:Discord:1224309480171245621>** Bot Commands Count Is: \`${message.client.commands.size + 1}\`**`, true)
          .setTimestamp()

        message.channel.send(infoEmbed)
      })

    } catch (e) {
      function NeedHelpButtons() {
        const btn1 = new MessageButton()
          .setStyle('url')
          .setLabel('Invite Me')
          .setEmoji('🤖')
          .setURL(client.config.discord.invite.replace("{clientId}", client.user.id))

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