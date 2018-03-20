/*
单例模式

js里的单例模式这里理解下来就是一个对象
*/

var Ming = {
    g: function(id){
        return document.getElementById(id);
    },
    css: function(id, key, value){
        this.g(id).style[key] = value;
    }
}


/*
实现静态变量
*/

var conf = (function(){
    var staticValue = {
        MAX_NUM: 100,
        MIN_NUM: 1,
        COUNT: 100
    }

    return {
        get: function(name){
            return staticValue[name];
        }
    }
})();

/*
惰性单例
*/
var Lazysingle = (function(){
    //单例实例引用
    var _instance = null;

    function single(){
        return {
            publicMethod: function(){},
            publicProperty: 1.0
        }
    }

    //获取单例对象接口
    return function(){
        if(!_instance){
            _instance = single();
        }

        return _instance;
    }
})();