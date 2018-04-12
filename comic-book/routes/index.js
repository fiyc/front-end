var express = require('express');
var router = express.Router();
var comiccontrol = require('../controller/comic-controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '漫画库' });
});


router.get('/read', function(req, res, next) {
  let id = req.query.id;
  res.render('read', { title: '漫画库', bookId: id });
});

router.get('/comic', comiccontrol.getcomic);
router.get('/books', comiccontrol.getBooks);
module.exports = router;
