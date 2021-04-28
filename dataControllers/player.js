player = module.exports = {
    playing: false,
    control: null,
    volume: 0.05,
    controlInit: function(data){
        player.control = data;
        player.control.setVolume(player.volume);
    },
    setPlaying: function(data){
        player.playing = data;
    },
    updateVolume: function(data){
        player.volume = data;
        player.control.setVolume(player.volume);
    },
};