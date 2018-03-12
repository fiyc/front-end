var concurrencyCount = 0;
var fetchUrl = function(url, callback){
		concurrencyCount ++;
		var delay = parseInt((Math.random() * 10000000) % 2000, 10);
		console.log(`现在的并发数是${concurrencyCount}, 正在抓取url: ${url}, 耗时${delay}毫秒.`);

		setTimeout(function(){
				concurrencyCount --;
				callback(null, url + 'html content');
		}, delay);
}

module.exports = fetchUrl;
