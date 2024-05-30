const Discord = require('discord.js')
module.exports = {
    name: "setprefix",
    cooldown: 5,
    aliases: ["set-prefix", "stp"],
    category: 'Setup 💻',
    utilisation: 'setprefix [new-prefix]',
    description: "Mengubah prefix bot di server",


    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        try {
            const db = client.db;
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                let pererrorEmbed = new Discord.MessageEmbed()
                    .setColor("0xFF0000")
                    .setTitle(`**❌ | Error**`)
                    .setDescription(`Anda tidak memiliki izin yang cukup🤕`)
                message.channel.send(pererrorEmbed)


            } else
                var prefix = await db.get(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = client.prefix;
            var newPrefix = args.join(' ')
            if (!newPrefix) {
                await db.set(`prefix_${message.guild.id}`, client.prefix);
                let errorprefixEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTimestamp(Date.now())
                    .setAuthor(`prefix dari ${client.user.tag} diubah👌🏻`, client.user.displayAvatarURL())
                    .setFooter(`prefix diubah oleh ${message.author.tag} |`, message.author.displayAvatarURL())
                    .setDescription(`Prefix Bot dikembalikan ke default **${process.env.PREFIX}**`)
                message.channel.send(errorprefixEmbed)
            } else if (newPrefix) {
                if (newPrefix.length > 7) {
                    let errorEmbed = new Discord.MessageEmbed()
                        .setColor("")
                        .setTitle(`**❌ | Error**`)
                        .setDescription(`Panjang Prefix terlalu panjang😶‍🌫️`)
                    message.channel.send(errorEmbed)
                }
                await db.set(`prefix_${message.guild.id}`, newPrefix);
                let prefixEmbed = new Discord.MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor("RANDOM")
                    .setDescription(`Prefix Bot diubah menjadi **${newPrefix}** di server ini😁`)
                    .setTimestamp(Date.now())
                    .setAuthor(`prefix dari ${client.user.tag} diubah👌🏻`, client.user.displayAvatarURL())
                    .setFooter(`prefix diubah oleh ${message.author.tag} |`, message.author.displayAvatarURL())
                message.channel.send(prefixEmbed)
            }
        } catch (err) {
            return;
        }
    }
}
