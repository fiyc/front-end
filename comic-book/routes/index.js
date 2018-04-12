var express = require('express');
var router = express.Router();
var comiccontrol = require('../controller/comic-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/comic', comiccontrol.getcomic);
module.exports = router;
