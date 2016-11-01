var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('instructions', { title: 'Instructions' });
});

module.exports = router;
