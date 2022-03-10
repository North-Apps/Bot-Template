const { MessageEmbed, Permissions } = require('discord.js');
const north = require('northapps-package');
const config = require("../../../../Config");

module.exports = {
	name: "verify",
  description: "Verify in this guild.",
	run: async(client, interaction, Discord) => {
        const { member, guild, channel } = interaction;
    
const info_r = await north.whois(member.id);
const runner = info_r.id;
const runner_disabled = info_r.disabled;
const mode = config.mode;
const author_url = config.author_url;
const author = config.author;
const author_icon = config.author_icon;
const footer_icon = config.footer_icon;
const footer = config.footer;
const color = config.color;
        
if(!runner) return interaction.reply({ content: "Not in system.", ephemeral: true });
if(runner_disabled == "true") return interaction.reply({ content: "Your account is disabled.", ephemeral: true });
        
if(mode === "merged" || mode === "verify"){
        
try {
        
const Embed = new MessageEmbed()
	.setColor(`${color}`)
	.setTitle('Verify')
	.setAuthor({ name: `${author}`, iconURL: `${author_icon}`, url: `${author_url}` })
    .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&userId=${info_r.id}`)
    .setDescription(`Welcome **${info_r.roblox.username}**!`)
	.setFooter({ text: `${footer}`, iconURL: `${footer_icon}` });
        
      let person = guild.members.cache.get(member.id);
      
      await person.setNickname(`${info_r.roblox.username} | ${interaction.user.username}`)
    
await interaction.reply({ embeds: [Embed] });
  } catch (error) {
    console.log(error);
  }
}else{interaction.reply({ content: "You cannot use this in this server.", ephemeral: true });}
    }
}