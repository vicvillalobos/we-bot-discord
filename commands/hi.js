module.exports = {
    name: 'hi',
    description: 'Says Hello back when you say hi!',
    execute: function (message, args) {
        message.channel.send('Hello! :wave:');
    }
}