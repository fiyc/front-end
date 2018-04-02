var clients = {};

module.exports = {
    exit : function(id){
        if(clients[id]){
            return true;
        }else{
            return false;
        }
    },
    push: function(id, client){
        clients[id] = client;
    },
    remove: function(id){
        clients[id] = undefined;
    },
    broadcast: function(fn){
        for(var id in clients){
            if(clients[id]){
                fn(clients[id]);
            }
        }
    }
};