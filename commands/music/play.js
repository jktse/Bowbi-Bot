const ytdl = require('ytdl-core');
module.exports = {
	name: 'play',
	description: 'Gets the Bot to join the voice channel that message came from and play from queue',
	usage: '',
	cooldown: 5,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue, player) {
        if (message.member.voice.channel && queue.count > 0) {
            message.member.voice.channel.join().then(connection =>{
                player.setPlaying(true);
                data = queue.array[0];
                if(data[0] === 'yt'){
                    const stream = ytdl(data[1], {filter: 'audioonly'});
                    player.controlInit(connection.play(stream));
                    player.control.on('start', () => {
                        message.channel.send("Now playing: " + data[1]);
                        message.channel.send("Number of songs in queue: " + queue.count);
                    });
                    player.control.on('finish', () => {
                        console.log("Finished playing: " + data[1])
                        if(queue.count == 0){
                            console.log("Nothing left");
                        }else{
                            queue.remove();
                        }
                        if(queue.count > 0){
                            this.execute(message, args, client, queue, player);
                        }else{
                            const start = Date.now();
                            var now = Date.now();

                            console.log("No more music in queue.");
                            message.channel.send("No more music left in queue.");

                            player.setPlaying(false);
                        }
                    });
                }
            })
        }else{
            if(player.playing == true){
                message.reply(`I am currently playing, either terminate me !stop, or wait until I am done`);
            }else if(queue.count == 0){
                message.reply(`I have no songs queues up, please queue up some songs before playing`);
            }else{
                message.reply(`you are not in a voice channel so I am very confused.\nPlease join a voice channel so I know where to go.`);
            }
        }
	},
};