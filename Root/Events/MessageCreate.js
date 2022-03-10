const chalk = require("chalk");
const config = require("../../Config");

module.exports = {
    name: "messageCreate",
    run: async(message, client) => {
        const cprefix = config.prefix;
        const loadCommandOptions = require(`${ROOT.path}/Root/Structures/CommandOptions/loadCommandOptions`)
        ROOT.config.prefix.forEach(prefix => {
            if (!message.content.toLowerCase().startsWith(cprefix)) return;
            const cmdName = message.content.toString().toLowerCase().slice(cprefix.length).trim().split(" ")[0]
            const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.messageCommands.aliases.get(cmdName))
            if (!command) return;
            if (command.allowBots) loadCommandOptions(client, message, command, false)
            else if (message.author.bot) return;
            else if (command.guildOnly == false) loadCommandOptions(client, message, command, false)
            else if (!message.guild) return;
            else loadCommandOptions(client, message, command, false)
        })
    }
}