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
                while(queue.count != 0){
                    data = queue.array[0];
                    console.log("Debug 1");
                    if(data[0] === 'yt'){
                        const stream = ytdl(data[1], {filter: 'audioonly', volume: 0.25});
                        console.log("Debug 2");
                        const dispatcher = connection.play(stream);
                        console.log("Debug 3");
                        dispatcher.on('start', () => {
                            message.channel.send("Now playing: " + data[1]);
                        });
                        console.log("Debug 4");
                    }
                    queue.remove();
                }
            })
        }else{
            message.reply(`you are not in a voice channel so I am very confused.\nPlease join a voice channel so I know where to go.`)
        }
	},
};