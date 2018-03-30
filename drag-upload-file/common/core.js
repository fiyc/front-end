const xls = require('xlsx');

var config = {
	//每一列数据的处理逻辑, 需要返回返回{key: value}
	columnHanders: {},
	//sheet与脚本关联
	sheetMappings: {}
}

var hook = {}

var handerEachLine = function (sheetName, jsonObject) {

	if (!jsonObject) {
		return '';
	}

	var lineObject = {}
	for (var key in jsonObject) {

		if (config.columnHanders[key]) {
			var handerResult = config.columnHanders[key](hook, jsonObject[key]);
			if (typeof handerResult === "object") {
				Object.assign(lineObject, handerResult);
			} else {
				throw new Error('Invalid columnHander function');
			}
		} else {
			lineObject[key] = jsonObject[key];
		}
	}

	var hasSheetMapping = false;
	if (config.sheetMappings[sheetName]) {
		try {
			hasSheetMapping = true;
			var sqlconfig = require("./config/"+config.sheetMappings[sheetName]);
			return sqlconfig.getsql(lineObject);
		}catch(err){
			hasSheetMapping = false;
			console.warn('未找到关于' + config.sheetMappings[sheetName] + '的有效配置. 将使用默认配置输出sql.');
		}
	}

	var columns = ',';
	var values = ',';

	for (var item in lineObject) {
		columns += item + ',';
		values += "'" + lineObject[item] + "',"
	}

	columns = columns.substring(1, columns.length - 1);
	values = values.substring(1, values.length - 1);

	return `insert into ${sheetName} (${columns}) values (${values})`;

}

var workbook;

var output = function (indexs, outputPath) {
	var result = '';

	var sheetNames = workbook.SheetNames;

	//全部输出
	if (!indexs || indexs.length == 0) {
		for (var index in sheetNames) {
			var sheetName = sheetNames[index];
			var worksheet = workbook.Sheets[sheetName];
			var jsonData = xls.utils.sheet_to_json(worksheet);
			for (var jsonLine in jsonData) {
				var line = handerEachLine(sheetName, jsonData[jsonLine]);
				result += "\n" + line;
			}
		}
	} else {
		for (var index in indexs) {
			if (index > sheetNames.length - 1) {
				continue;
			}
			var sheetName = sheetNames[index];
			var worksheet = workbook.Sheets[sheetName];
			var jsonData = xls.utils.sheet_to_json(worksheet);
			for (var jsonLine in jsonData) {
				var line = handerEachLine(sheetName, jsonLine);
				result += "\n" + line;
			}
		}
	}

	if(outputPath){
		var fs = require('fs');
		fs.writeFile(outputPath, result, {flag:'w', encoding: 'utf-8'}, function(err){
			if(err){
				console.err(err);
			}else{
				console.log('数据写入: ' + outputPath);
			}
		});
	}
	return result;
}



function XLSER(path) {
	workbook = xls.read(path, {});

	return {
		setConfig: function (conf) {
			Object.assign(config, conf);
		},
		//指定sheet输出， sheets为int数组
		//无参数时全部导出
		getSql: function (indexs, outputPath) {
			return output(indexs, outputPath);
		},

		outputSql: function (outputPath) {

		}
	}
}

module.exports = XLSER;
