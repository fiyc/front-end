// Node.js 多进程 exec

var fs = require('fs');
var child_process = require('child_process');

var childCallback = function(error, stdout, stderr){
		if(error){
				console.log(error.stack);
				console.log('Error Code: ' + error.code);
				console.log('Signal received: ' + error.signal);
		}

		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
}

var cmds = ['ls -l', 'node support.js 1', 'node support.js 2'];
for(var i = 0; i < 3; i++){

		var cmd = cmds[i]
		//var workerProcess = child_process.exec('node support.js ' + i, childCallback);
		var workerProcess = child_process.exec(cmd, childCallback);

		workerProcess.on('exit', function(code){
				console.log('子进程已退出, 退出码: ' + code);
		});
}
