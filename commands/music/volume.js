const ytdl = require('ytdl-core');
module.exports = {
	name: 'volume',
	description: 'Changes the volume level of the bot',
	usage: '[Number from 0 to 100]',
    aliases: ['v'],
	cooldown: 5,
	guildOnly: true,
    args: true,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue, player) {
        if(player.playing == true || !isNaN(args[0])){
            if(args[0] >= 0 && args[0] <= 100){
                player.updateVolume(args[0] / 100);
            }else{
                message.reply(`Please enter a number between 0 to 100`);
            }
        }else{
            if(isNaN(args[0])){
                message.reply(`Please enter a positive number from 0 to 100`);
            }
        }
	},
};