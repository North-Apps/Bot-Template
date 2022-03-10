const { MessageEmbed, Permissions } = require('discord.js');
const north = require('northapps-package');
const config = require("../../../../Config");

module.exports = {
	name: "rank",
    options: [{
        name: "rank",
        type: "STRING",
        description: "Rank.",
        required: true
    },
    {
        name: "user",
        type: "USER",
        description: "User to rank.",
        required: true
    }],
	description: "Rank this user.",
	run: async(client, interaction, Discord) => {
        const { member, guild, channel } = interaction;
if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({ content: "You can't rank this user.", ephemeral: true });
     
const args_3 = interaction.options.getString("rank");
const info = interaction.options.getUser("user");
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
        
if(mode === "merged" || mode === "rank"){
        
  try {
    const id = info.id;
    const info_u = await north.whois(id);
    if (interaction.user.id == id) return interaction.reply({ content: "You can't rank yourself.", ephemeral: true });
    const disabled = info_o.disabled;
    if(!info_u) return interaction.reply({ content: "Not in system.", ephemeral: true });
    if(disabled == true) return interaction.reply({ content: "Owner account is disabled.", ephemeral: true });
        
const Embed = new MessageEmbed()
	.setColor(`${color}`)
	.setTitle('Rank')
	.setAuthor({ name: `${author}`, iconURL: `${author_icon}`, url: `${author_url}` })
    .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&userId=${info_u.id}`)
    .setDescription(`Ranked <@${id}> to **${args_3}**.`)
	.setFooter({ text: `${footer}`, iconURL: `${footer_icon}` });
  
  north.rank(guild.id, config.key, info_u.id, args_3);
    
await interaction.reply({ embeds: [Embed] });
  
  } catch (error) {
    console.log(error);
  }
}else{interaction.reply({ content: "You cannot use this in this server.", ephemeral: true });}
    }
}