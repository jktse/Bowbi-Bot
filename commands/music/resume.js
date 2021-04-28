module.exports = {
	name: 'resume',
	description: 'Pause all music from being played by the bot.',
	usage: '',
    aliases: ['r'],
	cooldown: 5,
	guildOnly: true,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue, player) {
        if(player.playing == true){
            player.control.resume();
        }
	},
};