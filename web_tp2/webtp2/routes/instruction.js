var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('instruction', { title: 'Intructions' });
});

module.exports = router;
