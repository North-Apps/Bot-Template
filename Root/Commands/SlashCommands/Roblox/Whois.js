const { MessageEmbed } = require('discord.js');
const north = require('northapps-package');
const config = require("../../../../Config");

module.exports = {
	name: "whois",
    options: [{
        name: "user",
        type: "USER",
        description: "User to see.",
        required: false
    }],
	description: "Whos this user.",
	run: async(client, interaction, Discord) => {
        const { member, guild, channel } = interaction;

const info = interaction.options.getUser("user") || interaction.user;
const info_r = await north.whois(member.id);
const info_o = await north.whois(guild.ownerId);
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
    const id = info.id;
    const rob = await north.whois(id);
    const disabled = info_o.disabled;
      
    if(rob == null) return interaction.reply({ content: "Not in system.", ephemeral: true });
    if(disabled == true) return interaction.reply({ content: "Owner account is disabled.", ephemeral: true });
        
const Embed = new MessageEmbed()
	.setColor(`${color}`)
	.setTitle('Whois')
	.setAuthor({ name: `${author}`, iconURL: `${author_icon}`, url: `${author_url}` })
    .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&userId=${rob.id}`)
    .addFields(
		    { name: 'Display Name', value: `${rob.roblox.displayName}`, inline: true },
		    { name: 'Username', value: `${rob.roblox.username}`, inline: true },
        { name: 'Status', value: `${rob.roblox.status}`, inline: true },
        { name: 'About Me', value: `${rob.roblox.blurb}`, inline: true },
        { name: 'Age', value: `${rob.roblox.age}`, inline: true },
        { name: 'Friends', value: `${rob.roblox.friendCount}`, inline: true },
        { name: 'Banned', value: `${rob.roblox.isBanned}`, inline: true },
	)
	.setFooter({ text: `${footer}`, iconURL: `${footer_icon}` });
          
await interaction.reply({ embeds: [Embed] }); 
  } catch (error) {
    console.log(error);
  }
}else{interaction.reply({ content: "You cannot use this in this server.", ephemeral: true });}
    
    }
}