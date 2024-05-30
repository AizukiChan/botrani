module.exports = {
  name: "setlogs",
  cooldown: 5,
  aliases: ["logs", "slg"],
  category: 'Setup 💻',
  utilisation: 'setlogs [channel]',
  description: "Mengatur sebuah channel dimana bot dapat mengirimkan log moderasi!",
  usage: "[channel mention | channel ID | channel name]",

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {Array<string>} args 
   * @returns 
   */
  async execute(client, message, args) {

    const db = client.db;
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**Anda tidak memiliki izin yang dibutuhkan! - [MANAGE_CHANNELS]**")
    if (!args[0]) {
      let b = await db.get(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Channel Modlog yang Diatur di Server Ini adalah \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Silakan Masukkan Nama Channel atau ID Untuk Diatur!**"
        );
    }
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    if (!channel || channel.type !== 'text') return message.channel.send("**Silakan Masukkan Channel Teks yang Valid!**");

    try {
      let a = await db.get(`modlog_${message.guild.id}`)

      if (channel.id === a) {
        return message.channel.send("**Channel ini sudah Diatur Sebagai Modlog Channel!**")
      } else {
        client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Modlog Channel Diatur!**")
        await db.set(`modlog_${message.guild.id}`, channel.id)

        message.channel.send(`**${client.emotes.success}|Modlog Channel Telah Diatur dengan Sukses di \`${channel.name}\`!**`)
      }
    } catch {
      return message.channel.send("**Error - `Izin Tidak Lengkap atau Channel Bukan Channel Teks!`**");
    }
  }
}
