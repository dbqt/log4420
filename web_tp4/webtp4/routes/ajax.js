var express = require('express');
var pseudoBD = require('./../data/pseudoBD');

var db = require('../lib/db.js')
var mongoose = require( 'mongoose' );
var QuestionsDB = mongoose.model( 'Questions' )

var router = express.Router();

/* page d'admin */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});

/* ajouter une question au db */
router.post('/addQuestion', function(req, res, next) {
  var nbQuestions = QuestionsDB.count();
  // creer un objet Questions a partir du form
   new Questions({
    id : nbQuestions + 1,
    domaine : req.body.domaine,
    question : req.body.question,
    reponse1 : req.body.reponse1,
    reponse2 : req.body.reponse2,
    reponse3 : req.body.reponse3,
    answer : req.body.answer
    //appeler save pour enregistrer cet objet dans la db
  }).save(function( err, Questions, count ){
      // refresh la page kinda
      res.redirect('/api/admin');
  });
});

/* GET base api. */
router.get('/', function(req, res, next) {
  res.json({data: "test", id: 12123, table: [4, 3, 2 ,1 ,0], dict: {a : 'A', b: 'B', c: 'C'}})
});

/* GET questions api. */
router.get('/questions', function(req, res, next) {
  var nbQuestions = QuestionsDB.count();
  var random = Math.floor(Math.random() * nbQuestions);
  //res.json(pseudoBD[random]);
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