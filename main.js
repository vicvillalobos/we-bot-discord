const Discord = require('discord.js');

const client = new Discord.Client();

// https://discord.com/oauth2/authorize?client_id=834863589365907476&scope=bot&permissions=8589934591

client.once('ready', () => {
    console.log('WeBot is online!');
});


// This has to be at the end of the file!
client.login('ODM0ODYzNTg5MzY1OTA3NDc2.YIHFTg.Z3JYjpHjREdP1QJ9U7iPPb5Vooo');

