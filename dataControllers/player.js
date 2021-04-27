player = module.exports = {
    playing: false,
    control: null,
    controlInit: function(data){
        player.control = data;
    },
    setPlaying: function(data){
        player.playing = data;
    }
};