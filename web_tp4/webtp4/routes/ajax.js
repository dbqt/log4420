var express = require('express');
var pseudoBD = require('./../data/pseudoBD');

var db = require('../lib/db.js')
var mongoose = require( 'mongoose' );
var Questions = mongoose.model( 'Questions' );
var Stats = mongoose.model( 'Stats' );

var router = express.Router();

/* page d'admin */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});

/* REST API */

/* /question */
// get all questions
router.get('/question', function(req, res, next) {
    Questions.find().exec(function(err, data) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(data);
      }
	  });
});
// create new question
router.post('/question', function(req, res, next) {
    // get a random question
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
        if(err) {
          res.send(err); 
          console.log(err);
        }
        else { 
          res.sendStatus(201);
        }
      });
  } else {
    res.status(400).send('Invalid question');
  }
});

// delete all questions
router.delete('/question', function(req, res, next) {
    // get a random question
    Questions.remove(function(err) {
      if(err) res.send(err);
      else res.sendStatus(200);
    })
    // this is powerful, use with care
});

/* LEGACY */

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
        if(err) {
          res.status(500).send(err); 
          console.log(err);
        }
        else { 
          res.sendStatus(200);
        }
      });
  } else {
    res.status(400).send('Invalid question');
  }
});

/* GET base api. */
router.get('/', function(req, res, next) {
  res.json({data: "test", id: 12123, table: [4, 3, 2 ,1 ,0], dict: {a : 'A', b: 'B', c: 'C'}})
});

/* GET questions api. */
router.get('/questions', function(req, res, next) {
    // get a random question
    Questions.find().exec(function(err, data) {
      if(err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        var random = Math.floor(Math.random() * data.length);
        res.json(data[random]);
      }
	  });
});

/* Returns the next question with the correct subject */
router.post('/questions', function(req, res, next) {
  var domaineChoisi = req.body.domaine;
  var nombredequestions = req.body.nombredequestions;
  var curr = req.body.currentNb;

  /*var filteredQuestions = pseudoBD.filter(function(element) {
    return element.domaine == domaineChoisi;
  });*/

  // pick a question in a filtered array of questions with the right domain
  Questions.find( { domaine: domaineChoisi } ).exec(function(err, data) {
    if(err) {
      res.status(500).send(err); 
      console.log(err);
    }
		else {
      res.json(data[curr%data.length]);
    }
	});

  //res.json(filteredQuestions[curr%filteredQuestions.length])
});

router.get('/nbQuestionsMax', function(req, res, next) {
	Questions.aggregate({
    $group : { _id : '$domaine', count : {$sum : 1}}},
     function(err, data){
        if(err){
            res.status(500).send(err);
            console.log(err);
        }
        else {
            // reformat the previous result into { JavaScript: 1, CSS: 1, HTML: 14 }
            var domaineCount = {};
            data.forEach(function(entry){
              domaineCount[entry._id] = entry.count;
            });
            res.json(domaineCount);
        }
   });
});

router.post('/verifyAnswer', function(req, res, next) {
  var questionId = req.body.questionId;
  var reponseChoisie = req.body.reponseChoisie;

  Questions.findOne( { _id: questionId } ).exec(function(err, data) {
    if(err)
    {
      res.status(500).send(err); 
      console.log(err);
    }
    else
    {
      if (data.answer == reponseChoisie)
      {
        res.json(1);
      }
      else
      {
        res.json(0);
      }
    }
  });
});

// Progrès courant du user lors de l'examen (exemple: rendu à question 2, 1 point d'accumulé)
router.get('/progres', function(req, res, next) {

 Stats.findOne().exec(function(err, data) {
    if(err)
    {
      res.status(500).send(err); 
      console.log(err);
    }
    else
    {
      console.log(data);
      res.json(data);
    }
  });
});

router.put('/stats/progres', function(req, res, next) {
  
});


function isQuestionValid(question) {
  //console.log(question);
  if(question.domaine != 'HTML' && question.domaine != 'CSS' && question.domaine != 'JavaScript')
      return false;
  if(question.question == "") return false;
  if(question.reponse1 == "") return false;
  if(question.reponse2 == "") return false;
  if(question.reponse3 == "") return false;
  if(question.answer != 'reponse1' && question.answer != 'reponse2' && question.answer != 'reponse3')
      return false;
  return true;
}

module.exports = router;
