const Discord = require('discord.js');

const client = new Discord.Client();

const token = process.env.discordtoken;
// https://discord.com/oauth2/authorize?client_id=834863589365907476&scope=bot&permissions=8589934591

client.once('ready', () => {
    console.log('WeBot is online!');
});


// This has to be at the end of the file!
client.login(token);

