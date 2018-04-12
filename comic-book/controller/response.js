var makeResponse = function(code, msg, data){
    return {
        statuscode: code,
        message: msg,
        body: data
    }
}


module.exports = {
    success : function(msg){
        return makeResponse(200, msg, {});
    },
    error: function(msg){
        return makeResponse(500, msg, {});
    },
    data: function(msg, data){
        return makeResponse(200, msg, data);
    }
}