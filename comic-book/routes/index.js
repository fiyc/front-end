var express = require('express');
var router = express.Router();
var comiccontrol = require('../controller/comic-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '一人之下' });
});

router.get('/comic', comiccontrol.getcomic);
module.exports = router;
