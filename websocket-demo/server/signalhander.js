

const codeEnum = {
    REQ_LOGIN : 1,
    REQ_SENDMESSAGE : 2,
    RES_LOGIN : 3,
    RES_LOGIN_RES : 4,
    RES_NEW_CHATER : 5,
    RES_MSG : 6,
    RES_ERROR : 7
}

var analysisRequest = function(msg){
    var result = {
        reqCode : 0,
        data : {}
    };
    try{
        const reqObject = JSON.parse(msg);
        if(!reqObject || !reqObject.reqCode || !reqObject.data){
            return undefined;
        }

        return Object.assign(result, reqObject);
    }catch(err){
        return undefined;
    }
}

var response = function(code, msg, data){
    this.resCode = code;
    this.msg = msg;
    this.data = data;
}

response.prototype.toString = function(){
    return JSON.stringify(this);
}

module.exports = {
    analysisRequest : analysisRequest,
    response : response,
    codeEnum : codeEnum,
    nologinres : function(){
        return new response(
            codeEnum.RES_LOGIN,
            '等待用户名',
            undefined
        ).toString();
    },
    loginres : function(msg, data){
        return new response(
            codeEnum.RES_LOGIN_RES,
            msg,
            data
        ).toString();
    },
    errorres: function(msg){
        return new response(
            codeEnum.RES_ERROR,
            msg,
            undefined
        ).toString();
    },
    newchater: function(name, currentuser){
        return new response(
            codeEnum.RES_NEW_CHATER,
            '有新的用户加入啦',
            {
                username : name, 
                type : 1,
                currentuser: currentuser
            }
        ).toString(); 
    },
    chaterleave: function(name, currentuser){
        return new response(
            codeEnum.RES_NEW_CHATER,
            '有用户离开',
            {
                username : name, 
                type : 2,
                currentuser: currentuser
            }
        ).toString(); 
    },
    broadres: function(data){
        return new response(
            codeEnum.RES_MSG,
            '有人发出了新消息',
            data
        ).toString();
    }
};