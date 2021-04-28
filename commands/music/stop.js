const ytdl = require('ytdl-core');
module.exports = {
	name: 'stop',
	description: 'Clear all the data in the queue.',
	aliases: ['s'],
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