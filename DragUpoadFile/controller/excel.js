var xlscore = require('../common/core');
var guangyuConfig = require('../common/config/guangyu');

var controller = {
    //上传文件首页
    index : function(req, res, next){
      res.render('index', { title: 'Excel导出sql' });
    },
    //提交excel文件, 返回sql文件
    upload: function(req, res, next){
        // res.send(req.file.buffer);
        var result = {
            resultCode: 200,
            body: '未获取到有效的文件信息'
        };
        if(req.file && req.file.buffer){
            try{
                var xls = xlscore(req.file.buffer);
                xls.setConfig(guangyuConfig);
                var sqlStr = xls.getSql([], undefined);
                var buf = new Buffer(sqlStr);
                result.body = sqlStr;
                // res.send(buf);
            }catch(err){
                result.resultCode = 500;
                result.body = err;
                // res.send(new Buffer(err));
            }
        }else{
            result.resultCode = 500;
            result.body = '未获取到有效的文件信息'; 
        }

        res.send(result);
    }
}


module.exports = controller;