var express = require('express');
var pseudoBD = require('./../data/pseudoBD');

var router = express.Router();

/* GET base api. */
router.get('/', function(req, res, next) {
  res.json({data: "test", id: 12123, table: [4, 3, 2 ,1 ,0], dict: {a : 'A', b: 'B', c: 'C'}})
});

/* GET questions api. */
router.get('/questions', function(req, res, next) {
    console.log(req.body.domaine);
    console.log(req.body.nombredequestions);
  var random = Math.floor(Math.random() * pseudoBD.length);
  res.json(pseudoBD[random]);
});

/* Returns the next question with the correct subject */
router.post('/questions', function(req, res, next) {
  var domaine = req.body.domaine;
  var nombredequestions = req.body.nombredequestions;
  var curr = req.body.currentNb;

  var filteredQuestions = pseudoBD.filter(function(element) {
    return element.domaine == domaine;
  });

  res.json(filteredQuestions[curr%filteredQuestions.length])
});

module.exports = router;