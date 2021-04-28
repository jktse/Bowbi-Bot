queue = module.exports = {
    count: 0,
    array: [],
	add: function(data){
        queue.array.push(data);
        queue.count = queue.count + 1;
    },
    remove: function(){
        queue.array.shift();
        queue.count = queue.count - 1;
    },
    clear: function(){
        queue.array = [];
        queue.count = 0;
    },
    get: function(index){
        return queue.array[index];
    }    
};