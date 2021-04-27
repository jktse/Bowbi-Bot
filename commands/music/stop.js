const ytdl = require('ytdl-core');
module.exports = {
	name: 'stop',
	description: 'Stops the bot and make it leave',
	usage: '',
	cooldown: 5,
	guildOnly: true,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue, player) {
        if(player.playing == true){
            queue.clear();
            player.control.end();
        }
	},
};