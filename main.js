require('dotenv').config();

const Discord = require('discord.js');

const FS = require('fs');

const client = new Discord.Client({partials: [ "MESSAGE", "CHANNEL", "REACTION" ]});

client.commands = new Discord.Collection();

const commandFiles = FS.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log('setting up command: ', command.name);
    client.commands.set(command.name, command);
}



const prefix = "--";

const token = process.env.DISCORD_TOKEN;
console.log("DISCORD_TOKEN: ",token);
// https://discord.com/oauth2/authorize?client_id=834863589365907476&scope=bot&permissions=8589934591

client.once('ready', () => {
    console.log('WeBot is online!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/\s+/);
    const command = args.shift().toLowerCase();

    switch(command) {
        default:
            return;
        case "hi":
            client.commands.get('hi').execute(message, args);
            return;
        case "reactionrole":
            client.commands.get('reactionrole').execute(message, args, Discord, client);
            return;
    }
});

// This has to be at the end of the file!
client.login(token);

