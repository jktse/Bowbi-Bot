const ytdl = require('ytdl-core');
const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YOUTUBE_WATCH = 'https://www.youtube.com/watch?v=';
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.apiKey;
const fetch = require("node-fetch");
const fs = require('fs');

async function massLoader(data, queue, Playid, message){
	var token = null;
	var morePage = true;

	console.log(data.nextPageToken);
	if(data.nextPageToken == null){
		morePage = false;
		console.log("No more songs to load");
	}else{
		token = data.nextPageToken;
	}

	data.items.map((item) => {
		const {id, snippet = {} } = item;
		const {title, thumbnails = {}, resourceId} = snippet;
		var youtubeVid = YOUTUBE_WATCH + resourceId.videoId;
		queue.add(['yt', youtubeVid]);
	// 	var count = queue.count;
	// 	if(count % 10 == 0){
	// 		//message.channel.send('Adding: ' + youtubeVid);
	// 		//message.channel.send('Added to the queue and it is in position: ' + count);
	// 	}
	});

	if(morePage == true){
		console.log("More songs calling");
		getServerSideProps(Playid, token, queue, message);
	}
}

async function getServerSideProps(playlistId, next = null, queue, message){
	if (next === null){
		var url = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`;
	}else{
		var url = `${YOUTUBE_PLAYLIST_ITEMS_API}?pageToken=${next}&part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`;
	}
	console.log(url);
	const res = await fetch(url);
	const data = await res.json();
	return massLoader(data, queue, playlistId, message);
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }
  
async function busyWait(){
	await sleep(10000)
}


module.exports = {
	name: 'add',
	description: 'Adds the link provided into the queue of music we are going to play. (only supports Youtube ATM)',
	usage: '[Link to music]',
	aliases: ['a'],
	cooldown: 5,
	guildOnly: true,
    args: true,
	permissions: 'MOVE_MEMBERS',
	execute(message, args, client, queue) {
		if(ytdl.validateURL(args[0])){
			queue.add(['yt', args[0]]);
			var count = queue.count;
			if(count > 0){
				message.channel.send('Currently this was added to the queue and it is in position: ' + count);
			}
		}else if(args[0].includes("youtube.com/playlist")){
			var playlistId = args[0].split("https://www.youtube.com/playlist?list=");
			var token = null;
			message.channel.send('Detected a playlist, starting to look throught it');
			getServerSideProps(playlistId[1], token, queue, message).then(data => {
			});
		}else{
			console.log("Trying FI");
			var dir = ''
			for(i = 0; i < args.length; i ++){
				dir = dir + args[i];
				if(i + 1 < args.length){
					dir = dir + ' ';
				}
			}
			dir = dir + '\\';
			try {
				console.log("Trying " + dir);
				const files = fs.readdirSync(dir);

				//File object cintains all file names

				files.forEach(file => {
					queue.add(['fi', dir + file]);
					var count = queue.count;
					if(count > 0){
						message.channel.send('Currently this was added to the queue and it is in position: ' + count);
					}
				});
			} catch (err){
				console.error(err);
				message.reply(err);
			}
		}
	},
};