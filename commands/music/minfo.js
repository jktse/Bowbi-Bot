module.exports = {
	name: 'minfo',
	description: 'Pause all music from being played by the bot.',
	usage: '[Interger > 1]\nNo input defaults to 1.\nIf the number is larger than the number in queue we clamp it at the number in queue',
    aliases: ['info', 'i'],
	cooldown: 5,
	guildOnly: true,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue, player) {
        if(queue.count > 0){
            if(args[0] == null){
                url = queue.get(0);
                message.channel.send(`The next song that I have queued up is: ${url[1]}`);
            }else{
                var number2Display;
                if(args[0] > queue.count){
                    number2Display = queue.count;
                }else{
                    number2Display = args[0];
                }
                for(i = 0; i < number2Display; i ++){
                    url = queue.get(i);
                    if(i == 0){
                        message.channel.send(`The next song that I have queued up is: ${url[1]}`);
                    }else{
                        message.channel.send(`Song at position ${i+1} is: ${url[1]}`);
                    }
                }
            }
        }
	},
};