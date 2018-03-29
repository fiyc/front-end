const fs = require('fs');
var path = 'xxx.log';
var content = 'test';
fs.writeFile(path, content, { 'flat': 'a' }, function (err) { 
    console.log(__dirname);
    if(err){
        console.log(err);
    }
});