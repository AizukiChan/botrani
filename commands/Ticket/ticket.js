const Discord = require("discord.js");
const disbut = require("discord-buttons");

module.exports = {
  name: 'ticket',
  aliases: ['t'],
  category: 'Ticket 🎫',
  utilisation: '{prefix}ticket',

  async execute(client, message, args) {
    const db = client.db;
    let args1 = args[0];
    let time = 10000;
    let ticketCreate = ['new', 'create', 'add', 'enable'];
    let ticketClose = ['remove', 'disable', 'close'];
    const prefix = process.env.PREFIX;
    const allowedCategoryId = '1225245730709700680'; // Ganti dengan ID kategori yang diizinkan

    if (!args1) {
      let ticketEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Ticket System`)
        .setDescription('**Silakan Buat Tiket Jika Anda Memerlukannya😀**')
        .setThumbnail('https://cdn.discordapp.com/attachments/1223224422731616417/1224822468309549208/unha.png?ex=661ee3d0&is=660c6ed0&hm=3c9a8b6b4480c29eff7c7cfb22ccba0adeaaa03825bbe3d4b6608b4cb8318e31&')
        .addField(`Gunakan Perintah Berikut Untuk Mengelola Tiket | ${prefix}ticket create <Untuk Membuat Tiket | ${prefix}ticket close <Untuk Menutup Tiket>`, 'Anda dapat berkomunikasi di dalam channel tiket📩')
        .setURL('https://discord.gg/uY6zSGkwu6')
        .setFooter(`Requested by ${message.author.username} | Created By Ranii:)`, `${message.author.displayAvatarURL()}`)
        .setTimestamp(Date.now())
      message.channel.send(ticketEmbed);
      return;
    }

    // Check if the command is used in the allowed channel
    if (message.channel.id !== '1225245840575299664') {
      return message.channel.send("Maaf, Anda hanya dapat menggunakan perintah ini di channel 🎫Ticket 😊");
    }

    // Check if the command is used in the allowed category
    if (message.channel.parentID !== allowedCategoryId) {
      return message.channel.send("Maaf, Anda hanya dapat membuat tiket di kategori yang diizinkan.");
    }

    //Create Ticket
    let ticketName = await db.get(`ticketName_${message.author.id}_${message.guild.id}`);
    let ticketID = await db.get(`ticketID_${message.author.id}_${message.guild.id}`);
    if (ticketCreate.some(x => x.includes(args1.toLowerCase()))) {
      if (message.channel.id === ticketID) {
        message.delete().catch(() => { return });
        message.channel.send(`Anda tidak dapat membuka tiket di dalam channel tiket :/  ${message.author}`).then(x => x.delete({ timeout: time })).catch(() => { return })
      } else {
        if (!message.guild.channels.cache.find(x => x.name === ticketName)) {
          let buttonYes = new disbut.MessageButton()
            .setStyle("green")
            .setID("bale")
            .setLabel("Yes")
            .setEmoji("✔")
          let buttonNo = new disbut.MessageButton()
            .setStyle("red")
            .setID("kheir")
            .setLabel("Tidak")
            .setEmoji("❌")
          let row = new disbut.MessageActionRow()
            .addComponents(buttonYes, buttonNo)
          let ticketCreateEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Create Ticket`)
            .setDescription('**Apakah Anda Yakin Ingin Membuat Tiket?**')
            .setURL('https://discord.gg/uY6zSGkwu6')
            .setFooter(`Requested by ${message.author.username} | Created By Ranii :)`, `${message.author.displayAvatarURL()}`)
            .setTimestamp(Date.now())
          message.channel.send(ticketCreateEmbed, { components: row }).then((msg) => {
            const filter = (button1) => button1.clicker.user.id === message.author.id;
            let collect = msg.createButtonCollector(filter, { time: 500000 });
            collect.on('collect', async (x) => {
              x.reply.defer()
              if (x.id === "bale") {
                if (!message.guild.channels.cache.find(x => x.name === ticketName)) {
                  message.guild.channels.create(`ticket-${message.author.tag}`, { type: 'text', parent: allowedCategoryId }).then(async (channel) => {
                    await db.set(`ticketName_${message.author.id}_${message.guild.id}`, channel.name);
                    await db.set(`ticketID_${message.author.id}_${message.guild.id}`, channel.id);
                    channel.updateOverwrite(message.author.id, {
                      SEND_MESSAGE: true,
                      VIEW_CHANNEL: true
                    })
                    channel.updateOverwrite(message.guild.id, {
                      SEND_MESSAGE: false,
                      VIEW_CHANNEL: false
                    })
                    let btn = new disbut.MessageButton()
                      .setStyle("grey")
                      .setLabel("Tutup Tiket")
                      .setEmoji("🔒")
                      .setID("configTicket");
                    let row = new disbut.MessageActionRow()
                      .addComponent(btn);
                    let ticketChannelEmbed = new Discord.MessageEmbed()
                      .setDescription(`Silakan Tunggu **Staff** Untuk Memberikan Respon!!
                    Untuk Menutup Tiket Klik **"🔒"** `)
                      .setColor('RANDOM')
                    channel.send(`Tiket Dibuat oleh ${message.author}🙃`, { embed: ticketChannelEmbed, component: row }).catch(() => { return });

                    let yesEmbed = new Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`Tiket Anda Telah Dibuat`)
                      .setDescription(`**Tiket Anda Telah Dibuat dan Silakan Berkomunikasi di Channel ${channel}**`)
                      .setURL('httphttps://discord.gg/uY6zSGkwu6')
                      .setFooter(`Requested by ${message.author.username} | Created By Ranii :)`, `${message.author.displayAvatarURL()}`)
                      .setTimestamp(Date.now())
                    msg.delete().catch(() => { return });
                    message.channel.send(yesEmbed, null).catch(() => { return });
                  })
                } else {
                  message.channel.send("Maaf, Anda Sudah Membuat Tiket Sebelumnya 🙂")
                }
              } else if (x.id === "kheir") {
                let noEmbed = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(`Permintaan Dibatalkan`)
                  .setDescription(`**Permintaan Pembuatan Tiket Dibatalkan**`)
                  .setURL('https://discord.gg/uY6zSGkwu6')
                  .setFooter(`Requested by ${message.author.username} | Created By Ranii :)`, `${message.author.displayAvatarURL()}`)
                  .setTimestamp(Date.now())
                msg.edit(noEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
              }
            })
            setTimeout(() => {
              let timeoutEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`**Permintaan Anda Tidak Diproses😕 | Silakan Mencoba Kembali Setelah Beberapa Saat😊**`)
                .setTimestamp(Date.now())
              msg.edit(timeoutEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
            }, 30000)
          })
        } else {
          message.channel.send("Maaf, Anda Sudah Membuat Tiket Sebelumnya 🙂")
        }
      }
    }

    //Close Ticket
    if (ticketClose.some(x => x.includes(args1.toLowerCase()))) {
      if (message.channel.id === ticketID) {
        let buttonClose = new disbut.MessageButton()
          .setStyle("green")
          .setID("close")
          .setLabel("Ya")
          .setEmoji("✔")
        let buttonCancel = new disbut.MessageButton()
          .setStyle("red")
          .setID("cancel")
          .setLabel("Tidak")
          .setEmoji("❌")
        let row = new disbut.MessageActionRow()
          .addComponents(buttonClose, buttonCancel)
        let ticketCloseEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`Close Ticket`)
          .setDescription('**Apakah Anda Yakin Ingin Menutup Tiket?**')
          .setURL('https://discord.gg/uY6zSGkwu6')
          .setFooter(`Requested by ${message.author.username} | Created By Ranii :) |`, `${message.author.displayAvatarURL()}`)
          .setTimestamp()
        message.channel.send(ticketCloseEmbed, { components: row }).then((msg) => {
          const filter1 = (button1) => button1.clicker.user.id === message.author.id;
          let collect1 = msg.createButtonCollector(filter1, { time: 500000 });
          collect1.on('collect', async (x) => {
            x.reply.defer()
            if (x.id === "close") {
              x.message.edit('Menutup Channel Dalam **3 Detik**').then(() => {
                setTimeout(async () => {
                  await db.delete(`ticketName_${message.author.id}_${message.guild.id}`);
                  await db.delete(`ticketID_${message.author.id}_${message.guild.id}`);
                  x.message.channel.delete().catch(() => { return });

                }, 3000)
              })
            } else if (x.id === "cancel") {
              let cancelEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Permintaan Dibatalkan`)
                .setDescription(`**Permintaan Untuk Menutup Tiket Dibatalkan**`)
                .setURL('https://discord.gg/uY6zSGkwu6')
                .setFooter(`Requested by ${message.author.username} | Created By Ranii :)`, `${message.author.displayAvatarURL()}`)
                .setTimestamp(Date.now())
              msg.edit(cancelEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
            }
            setTimeout(() => {
              let timeoutEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`**Permintaan Anda Tidak Diproses😕 | Silakan Mencoba Kembali Setelah Beberapa Saat😊**`)
                .setTimestamp(Date.now())
              msg.edit(timeoutEmbed, null).then(x => x.delete({ timeout: time })).catch(() => { return });
            }, 30000)
          })
        })
      } else {
        message.delete().catch(() => { return });
        return message.channel.send(`Anda tidak dapat menggunakan perintah ini di dalam channel ini :/  ${message.author} hanya channel tiket yang memungkinkan :|`).then(x => x.delete({ timeout: time })).catch(() => { return });
      }
    }

  }
}
