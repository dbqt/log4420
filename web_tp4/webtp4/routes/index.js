var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Accueil' });
});

/* GET page d'admin */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});

module.exports = router;
