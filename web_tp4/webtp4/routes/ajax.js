var express = require('express');
var pseudoBD = require('./../data/pseudoBD');

var db = require('../lib/db.js')
var mongoose = require( 'mongoose' );
var Questions = mongoose.model( 'Questions' )

var router = express.Router();

/* page d'admin */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});

/* ajouter une question au db */
router.post('/addQuestion', function(req, res, next) {
  if(isQuestionValid(req.body)) {
      // creer un objet Questions a partir du form
      new Questions({
        domaine : req.body.domaine,
        question : req.body.question,
        reponse1 : req.body.reponse1,
        reponse2 : req.body.reponse2,
        reponse3 : req.body.reponse3,
        answer : req.body.answer
        //appeler save pour enregistrer cet objet dans la db
      }).save(function( err, Questions, count ){
        console.log(Questions);
        if (err != null){ console.log(err);}
        
        res.sendStatus(200);
      });
  } else {
    res.sendStatus(400);
  }
});

/* GET base api. */
router.get('/', function(req, res, next) {
  res.json({data: "test", id: 12123, table: [4, 3, 2 ,1 ,0], dict: {a : 'A', b: 'B', c: 'C'}})
});

/* GET questions api. */
router.get('/questions', function(req, res, next) {
  var nbQuestions = Questions.count();
  var random = Math.floor(Math.random() * nbQuestions);
  Questions.find().exec(function(err, data) {
		console.log(data);
	});
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

function isQuestionValid(question) {
  console.log(question);
  if(question.domaine != 'HTML' && question.domaine != 'CSS' && question.domaine != 'JavaScript')
      return false;
  console.log("domaine ok");
  if(question.question == "") return false;
  console.log("question ok");
  if(question.reponse1 == "") return false;
  console.log("reponse1 ok");
  if(question.reponse2 == "") return false;
  console.log("reponse2 ok");
  if(question.reponse3 == "") return false;
  console.log("reponse3 ok");
  if(question.answer != 'reponse1' && question.answer != 'reponse2' && question.answer != 'reponse3')
      return false;
  console.log("answser ok");
  return true;
}

module.exports = router;
