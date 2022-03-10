const { MessageEmbed } = require('discord.js');
const north = require('northapps-package');

module.exports = {
    name : 'help',
    run : async(client, message, args, Discord) => {

    message.reply("My commands are: verify, whois, promote, demote, rank")
  
    }
    }
