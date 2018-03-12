/*
一个使用async控制并发的例子
*/
var fetch = require('./Fetch.js');

var async = require('async');

var urls = [];

for(var i=0; i<100; i++){
		urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function(url, callback){
		fetch(url, callback);
}, function(err, result){
		console.log('final:');
		console.log(result);
});
