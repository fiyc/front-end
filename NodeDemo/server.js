// Node.js 路由 Server

var http = require('http');
var url = require('url');

function start(route){
		function onRequest(req, res){
				var urlStr = req.url;
				var pathName = url.parse(urlStr).pathname;
				route(pathName);
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write('Hello World');
				res.end();
		}

		http.createServer(onRequest).listen(8888);
		console.log('Server has started.');
}


module.exports = start;
