const ytdl = require('ytdl-core');
module.exports = {
	name: 'next',
	description: 'Stops the current song and plays the next one on the list',
	usage: '',
	aliases: ['n'],
	cooldown: 5,
	guildOnly: true,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue, player) {
        if(player.playing == true){
            player.control.end();
        }
	},
};