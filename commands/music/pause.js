module.exports = {
	name: 'pause',
	description: 'Pause all music from being played by the bot.',
    aliases: ['p'],
	usage: '',
	cooldown: 5,
	guildOnly: true,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue, player) {
        if(player.playing == true){
            player.control.pause();
        }
	},
};