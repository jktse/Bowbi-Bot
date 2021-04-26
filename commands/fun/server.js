module.exports = {
	name: 'server',
	description: 'This command tells you basic server information such as its name and number of users on the server.',
	usage: '',
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`Welcome to ${message.guild.name}. Please do not get our CEO angry.\nWe currently have ${message.guild.memberCount}`);
	},
};