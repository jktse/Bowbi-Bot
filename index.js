// require the discord.js module
const Discord = require('discord.js');

// create a new DIscord client
const client = new Discord.Client();

// This is to enable .env file and access the data in it
const dotenv = require('dotenv');
dotenv.config();

// When the clien is ready, run this code (basically a callback function)
// This even will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// Notice 'on' instead of 'once'
// This means the event can happen multiple times
// Here we check to see if a message has been sent, if the message matches the bot will reply back.
client.on('message', message => {
	console.log(message.content);
    if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
});

// Login to Discord with your app's token
client.login(process.env.TOKEN);

