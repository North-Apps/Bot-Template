module.exports = {
    name: "interactionCreate",
    run: async(interaction, client) => {
        const loadCommandOptions = require(`${ROOT.path}/Root/Structures/CommandOptions/loadCommandOptions`)
        if (interaction.isCommand()) loadCommandOptions(client, interaction, client.commands.slashCommands.get(interaction.commandName), true, "SlashCommand")
    }
}