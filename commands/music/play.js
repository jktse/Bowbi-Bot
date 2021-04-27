const { array } = require("../../queue");
const ytdl = require('ytdl-core');
module.exports = {
	name: 'play',
	description: 'Gets the Bot to join the voice channel that message came from.',
	usage: '',
	cooldown: 5,
    permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue) {
        if (message.member.voice.channel) {
            message.member.voice.channel.join().then(connection =>{
                data = queue.array[0];
                if(data[0] === 'yt'){
                    const stream = ytdl(data[1], {filter: 'audioonly'});
                    const dispatcher = connection.play(stream);
                    dispatcher.on('start', () => {
                        message.channel.send("Now playing: " + data[1]);
                        dispatcher.setVolume(0.25);
                    });
                    dispatcher.on('finish', () => {
                        console.log("Finished playing: " + data[1])
                        queue.remove();
                        if(queue.count != 0){
                            this.execute(message, args, client, queue);
                        }else{
                            console.log("No more music in queue.");
                            message.channel.send("No more music left in queue.");
                            connection.disconnect();
                        }
                    });
                }
            })
        }else{
            message.reply(`you are not in a voice channel so I am very confused.\nPlease join a voice channel so I know where to go.`)
        }
	},
};