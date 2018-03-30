var express = require('express');
var router = express.Router();
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var controller = require('../controller/excel');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/upload', upload.single('fff'), function(req, res, next){
//   console.log(req);
//   //console.log(typeof req.file.buffer);
// });

router.get('/', controller.index);
router.post('/upload', upload.single('fff'), controller.upload);

module.exports = router;
