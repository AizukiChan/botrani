module.exports = {
    name: "userroles",
    cooldown: 5,
    aliases: ["url"],
    category: 'Member 👻',
    utilisation: 'userroles [name | nickname | mention | ID]',
    description: "show member roles from the server",

    /**
     * 
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Message} message 
     * @param {Array<string>} args 
     * @returns 
     */
    async execute(client, message, args) {
        const Discord = require('discord.js');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply('Tidak Ada Member Yang Di Pilih');

        const memberRoles = member.roles.cache
            .filter(roles => roles.id !== message.guild.id)
            .array()
            .sort((a, b) => b.rawPosition - a.rawPosition)
            .map(role => role.toString())
            .join(', ')

        message.channel.send(
            new Discord.MessageEmbed()
                .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
                .setDescription(` Role ${member} 👉 ${memberRoles} `)
                .setColor('#fafafa')
        )
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