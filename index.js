// Enable Node's file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// Enable config.json to be used
const { prefix, token } = require('./config.json');

// create a new DIscord client
const client = new Discord.Client();

// Enables command cooldown
client.cooldowns = new Discord.Collection();

// Tells client where all the command scripts can be found
client.commands = new Discord.Collection();
//Gets subfolders
const commandFolders = fs.readdirSync('./commands');

// This allows us to dynamically add commands with subfolders
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// When the clien is ready, run this code (basically a callback function)
// This even will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// Notice 'on' instead of 'once'
// This means the event can happen multiple times
// Here we check to see if a message has been sent, if the message matches the bot will reply back.
client.on('message', message => {
	// Check if this is a command...
    // If not then we will exit callback
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Any additional arguments will be a space after !command
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // Command is the word after the !
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Tells user that command is only meant for server usage
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    // Check if user has that permision before allowing.
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('You can not do this!');
        }
    }

    // Ensure commands that need commands get commands
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // For command cooldown so we do not spam.
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    // Get time get how much time we have left
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // Tell the user if they are still on cooldown how much time they have left
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

// Login to Discord with your app's token
client.login(token);

