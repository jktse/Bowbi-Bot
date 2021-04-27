const ytdl = require('ytdl-core');
module.exports = {
	name: 'add',
	description: 'Adds the link provided into the queue of music we are going to play. (only supports Youtube ATM)',
	usage: '[Link to music]',
	cooldown: 5,
	guildOnly: true,
    args: true,
	permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue) {
		if(ytdl.validateURL(args[0])){
			queue.add(['yt', args[0]]);
			var count = queue.count;
			if(count > 0){
				message.channel.send('Currently this was added to the queue and it is in position: ' + count);
			}
		}else{
			message.reply("This is not a valid link.")
		}
	},
};