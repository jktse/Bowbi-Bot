// Enable Node's file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// Enable config.json to be used
const {token} = require('./config.json');

// create a new DIscord client
const client = new Discord.Client();

// Enables command cooldown
client.cooldowns = new Discord.Collection();

// Tells client where all the command scripts can be found
client.commands = new Discord.Collection();
//Gets subfolders
const commandFolders = fs.readdirSync('./commands');

//Get queue from queue.js
const queue = require('./dataControllers/queue.js');
const player = require('./dataControllers/player.js');

// This allows us to dynamically add commands with subfolders
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client, Discord));
	} else{
		client.on(event.name, (...args) => event.execute(...args, client, Discord, queue, player));
	}
}

// Login to Discord with your app's token
client.login(token);

