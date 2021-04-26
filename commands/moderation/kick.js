module.exports = {
	name: 'kick',
	description: 'A command that will \'kick\' the specified user.',
    usage: '@User',
    cooldown: 5,
    permissions: 'Kick_MEMBERS',
    guildOnly: true,
    args: true,
	execute(message, args) {
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }
        // If we have more than 1 'tag' then we need to ask the user to fix it
        if(args.length > 1){
            return message.channel.send(`Sorry, we can only kick (1) person at a time. >:D\n`);
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`${message.author} wanted to kick: ${taggedUser}`);
	},
};