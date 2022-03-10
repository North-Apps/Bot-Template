const chalk = require("chalk");
const config = require("../../Config");

module.exports = {
    name: "ready",
    once: true,
    run: async(client) => {
        client.user.setStatus(config.activity.status);
        client.user.setActivity(config.activity.activity, {
            type: config.activity.type,
        })
        console.log(chalk.bold.yellowBright("[Bot] ") + chalk.bold.blueBright(`Connected to ${client.user.tag}`))
        if (client.commands.messageCommands.size > 0) console.log(chalk.bold.redBright("[Handler]") + chalk.bold.greenBright(` Loaded ${client.commands.messageCommands.size} commands.`))
        if (client.commands.messageCommands.aliases.size > 0) console.log(chalk.bold.whiteBright("[Handler]") + chalk.bold.magentaBright(` Loaded ${client.commands.messageCommands.aliases.size} aliases.`))
        if (client.events.size > 0) console.log(chalk.bold.greenBright("[Handler]") + chalk.bold.cyanBright(` Loaded ${client.events.size} events.`))
        if (client.commands.slashCommands.size > 0) console.log(chalk.bold.red("[Handler]") + chalk.bold.yellow(` Found ${client.commands.slashCommands.size} slashCommands. Starting to load.`))
    }
}