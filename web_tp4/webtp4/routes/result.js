var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('result', { title: 'Résultat', giveup: false});
});

/* En cas d'abandon */
router.get('/abandon', function(req, res, next) {
  res.render('result', { title: 'Résultat', giveup: true});
});

module.exports = router;
