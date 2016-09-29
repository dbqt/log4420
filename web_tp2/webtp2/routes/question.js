var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/:mode/:nb', function(req, res, next) {
  res.render('question', { title: 'Question', mode: req.params.mode, nb: req.params.nb });
});

module.exports = router;
