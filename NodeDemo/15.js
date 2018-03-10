// Node.js MySQL

var mysql = require('mysql');

var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'msn290850640',
		database : 'tc_work'
});

connection.connect();

var sql = 'select * from iteration';
connection.query(sql, function(error, results, fields){
		if(error) throw error;


		console.log(results);
});


