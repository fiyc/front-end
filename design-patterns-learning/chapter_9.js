/*
外观模式

为一组复杂的子系统接口提供一个更高级的统一接口, 通过这个接口使得对子系统接口的访问更容易
*/


/*
在这里我们通过一个绑定点击事件的例子来说明外观模式
在js中 document.onclick = function(){} 是DOM0级事件, 当再次使用这种方式时会覆盖之前的绑定

因此要使用DOM2级事件 addEventListener
但是IE浏览器(低于9)不支持这个方法, 需要使用attachEvent
并且存在不支持DOM2级事件处理程序的浏览器

在这里, 针对不同浏览器的不同情况, 我们使用外观模式统一出一个方法.
*/

function addEvent(dom, type, fn){
    if(dom.addEventListener){
        dom.addEventListener(type, fn, false);
    }else if(dom.attachEvent){
        dom.attachEvent('on' + type, fn);
    }else{
        dom['on' + type] = fn;
    }
}

var myInput = document.getElementById('myInput');
addEvent(myInput, 'click', function(){
    console.log('bind a event');
});