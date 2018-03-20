/*
适配器模式

将一个类(对象)的接口(方法或属性) 转化为另外一个接口, 以满足用户需求. 使类(对象)之间接口的不兼容问题通过适配器得以解决
*/


/*
原书中提到了一个框架适配的例子, 不过这个例子十分的简单, 不做记录

参数适配器

通过定义默认的参数项, 来保证方法内调用参数始终正常. 这里相当于为入参做了一个适配器.

我认为这是种很有用的技巧, 在自己写的框架提供扩展项时, 可以控制调用者配置的有效性
*/

function dosomeThing(obj){
    var _adapter = {
        name: 'fiyc',
        title: '适配器模式',
        age: 25,
        prize: 50
    };

    Object.assign(_adapter, obj);

    //do thins with _adapter
}

/*
数据适配

针对一个数组结构的数据, 转化成更加有意义的数据结构
*/

var arr = ['Javascript', 'book', '前端', '08.01'];

function arrtoObjectAdapter(arr){
    return {
        name: arr[0],
        type: arr[1],
        title: arr[2],
        date: arr[3]
    };
}