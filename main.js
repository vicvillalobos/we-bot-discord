require('dotenv').config();

const Discord = require('discord.js');
const Command = require('./commands');

const client = new Discord.Client({partials: [ "MESSAGE", "CHANNEL", "REACTION" ]});

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

    const cmd = new Command(command);
    
    cmd.execute(message);
});

// This has to be at the end of the file!
client.login(token);

