var path = require('path');
var xlsxer = require('./core');
var guangyuconfig = require('./config/guangyu');

var args = process.argv.splice(2);
if(!args[0]){
    console.warn('未指定有效文件');
    return;
}

var targetFilePath = args[0];

var defalutOutputPath = path.resolve(targetFilePath, '..');

var outputFilePath = defalutOutputPath + '/output.sql';
if(args.length > 1){
    outputFilePath = args[1];
}
//var xls = xlsxer('/Users/yif/Documents/code/front-end/nodejs/xlsxer/resource/test.xls');
var xls = xlsxer(targetFilePath);
xls.setConfig(guangyuconfig);
var result = xls.getSql([], outputFilePath);
console.log('finish..');



