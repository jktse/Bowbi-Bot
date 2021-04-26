module.exports = {
	name: 'ping',
	aliases: ['pop', 'hi'],
	description: 'Ping!',
	usage: '',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};