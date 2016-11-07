var express = require('express');
var pseudoBD = require('./../data/pseudoBD');

var db = require('../lib/db.js')
var mongoose = require( 'mongoose' );
var Questions = mongoose.model( 'Questions' );
var Stats = mongoose.model( 'Stats' );

var router = express.Router();

/*************************************************************************
* NON-REST API 
**************************************************************************/

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

/* /next */
router.get('/next', function(req, res, next) {
    //load progress stats
    Stats.findOne(function(err, statsData){     
        if(statsData.mode == 'testrapide') {
          // get a random question
          Questions.findOneRandom(function(err, data) {
              if(err)
              {
                  console.log(err);
                  res.status(500).send(err);
              }
              else
              {
                  statsData.save(function(err) {
                      if (err) res.send(err);
                      else res.json(data);
                  });
              }
          });
        }
        // mode examen
        else
        {
          // pick a question in a filtered array of questions with the right domain
          Questions.findOneRandom( { domaine: statsData.progres.domaineEnCours }, function(err, data) {
              if(err)
              {
                  res.status(500).send(err); 
                  console.log(err);
              }
              else
              {
                  //statsData.progres.numeroQuestionEnCours = statsData.progres.numeroQuestionEnCours + 1;
                  statsData.save(function(err) {
                      if (err) res.send(err);
                      else res.json(data);
                  });
              }
          });
        }
    });
});

router.post('/verifyAnswer', function(req, res, next) {
    Stats.findOne(function(err, statsData){
        Questions.findOne( { _id: req.body.questionId } ).exec(function(err, data) {
            if(err)
            {
                res.status(500).send(err); 
                console.log(err);
            }
            else
            {
                if (data.answer == req.body.reponseChoisie)
                {
                    if(statsData.mode == "testrapide")
                    {
                        statsData.testRapide.reussi = statsData.testRapide.reussi + 1;
                    }
                    else
                    {
                        statsData.progres.scoreEnCours = statsData.progres.scoreEnCours + 1;
                        statsData.progres.numeroQuestionEnCours = statsData.progres.numeroQuestionEnCours + 1;
                    }
                    
                    statsData.save(function(err) {
                        if (err) res.send(err);
                        else res.json(1);
                    });
                }
                else
                {
                    if(statsData.mode == "testrapide"){
                        statsData.testRapide.echoue = statsData.testRapide.echoue + 1;
                    }
                    else
                    {
                        statsData.progres.numeroQuestionEnCours = statsData.progres.numeroQuestionEnCours + 1;
                    }
                    statsData.save(function(err) {
                        if (err) res.send(err);
                        else res.json(0);
                    });
                }
            }
        });
    });
});

router.post('/giveUp', function(req, res, next){
   Stats.findOne().exec(function(err, data) {
      if(err){ res.status(500).send(err); console.log(err); }
      else
      {
          data.progres.scoreEnCours = 0;
          data.save(function(err) {
              if (err) res.send(err);
              else res.sendStatus(200);
          }); 
      }
   });
});

router.get("/getMode", function(req, res, next){
    Stats.findOne().exec(function(err, data) {
        if(err){ res.status(500).send(err); console.log(err); }
        else
        {
            res.send(data.mode);
        }
    });
});

router.post("/continueExam", function(req, res, next){
    Stats.findOne().exec(function(err, data) {
        if(err){ res.status(500).send(err); console.log(err); }
        else
        {
            data.mode = "examen";
            data.save(function(err) {
                if (err) res.send(err);
                else res.sendStatus(200);
            }); 
        }
    });
});

/*************************************************************************
* REST API 
**************************************************************************/

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
          //console.log(Questions);
          if(err) {
              res.send(err); 
              console.log(err);
          }
          else
          { 
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
});

// get all stats
router.get('/stats', function(req, res, next) {
  Stats.findOne().exec(function(err, data) {
    if(err)
    {
      res.status(500).send(err); 
      console.log(err);
    }
    else
    {
      if(!data) data = new Stats();
      //console.log(data);
      res.json(data);
    }
  });
});

// delete all stats
router.delete('/stats', function(req, res, next) {
    Stats.findOne(function(err, data) {
      if(err) res.send(err);
      else {
      if(!data) data = new Stats();
        data.testRapide.reussi = 0;
        data.testRapide.echoue = 0;
        data.examen.reussi.HTML = 0;
        data.examen.reussi.JavaScript = 0;
        data.examen.reussi.CSS = 0;
        data.examen.echoue.HTML = 0;
        data.examen.echoue.JavaScript = 0;
        data.examen.echoue.CSS = 0;
        data.examensDetailles = [];
        data.progres.examenEnCours = false;
        data.progres.domaineEnCours = "";
        data.progres.scoreEnCours = 0;
        data.progres.nbQuestionsEnCours = 0;
        data.progres.numeroQuestionEnCours = 1;
        data.mode = "";
        data.save(function(err) {
            if (err) res.send(err);
            else res.sendStatus(200);
        });
      }
    });
});

// get detailed exams
router.get('/stats/examens-detailles', function(req, res, next) {
  Stats.findOne(function(err, data) {
      if(err) res.send(err);
      else {
          if(!data) data = new Stats();
          res.send(data.examensDetailles);
      }
    });
});

// reset detailed exams
router.delete('/stats/examens-detailles', function(req, res, next) {
  Stats.findOne(function(err, data) {
      if(err) res.send(err);
      else {
          if(!data) data = new Stats();
          data.examensDetailles = [];
          data.save(function(err) {
              if (err) res.send(err);
              else res.sendStatus(200);
          });
      }
    });
    
});

// get progress
router.get('/stats/progres', function(req, res, next) {
   Stats.findOne().exec(function(err, data) {
    if(err)
    {
      res.status(500).send(err); 
      console.log(err);
    }
    else
    {
      //console.log(data);
      res.json(data.progres);
    }
   });
});

//initialize progress at start of test
router.post('/stats/progres/:mode', function(req, res, next) {
  // get the progress to change it
  Stats.findOne(function(err, data) {
      if(err) {
        res.status(500).send(err); 
      }
      else
      {
        // if for some reason the db is empty, create one stats object
        if(!data) {
          data = new Stats();
        }

        // init the progress
        if(req.params.mode == "examen") {
            data.progres.examenEnCours = true;
            data.progres.domaineEnCours = req.body.choix_domaine;
            data.progres.scoreEnCours = 0;
            data.progres.nbQuestionsEnCours = req.body.choix_nombre;
            data.progres.numeroQuestionEnCours = 1;
            data.mode = req.params.mode;
            data.save(function(err) {
                if (err) res.send(err);
                else res.sendStatus(200);
            });    
        }
        else {
          /*
          data.progres.examenEnCours = false;
          data.progres.domaineEnCours = "Tous";
          data.progres.scoreEnCours = 0;
          data.progres.nbQuestionsEnCours = 0;
          data.progres.numeroQuestionEnCours = 1;
          */
          data.mode = req.params.mode;
          data.save(function(err) {
              if (err) res.send(err);
              else res.sendStatus(200);
          }); 
        } 
      }
  });
});

//reset progress
router.delete('/stats/progres', function(req, res, next) {
  Stats.findOne(function(err, data) {
      if(err)
      {
        res.status(500).send(err);
      }
      else
      {
        // if for some reason the db is empty, create one stats object
        if(!data) {
          data = new Stats();
        }
        // reset the progress
        data.progres.examenEnCours = false;
        data.progres.domaineEnCours = req.body.choix_domaine;
        data.progres.scoreEnCours = 0;
        data.progres.nbQuestionsEnCours = req.body.choix_nombre;
        data.progres.numeroQuestionEnCours = 1;
        data.mode = 'examen';
        data.save(function(err) {
            if (err) res.send(err);
            else res.sendStatus(200);
        });        
      }
  });
});

//handle exam results
router.post('/handleResult', function(req, res, next){
    var resultText;
    Stats.findOne().exec(function(err, data) {
        if (data.progres.nbQuestionsEnCours > 0)
        {
            if(Math.floor((data.progres.scoreEnCours / data.progres.nbQuestionsEnCours) * 100) < 25)
            {
                resultText = "Vous avez obtenu " + data.progres.scoreEnCours + "/" + data.progres.nbQuestionsEnCours + ". Une révision sérieuse est nécessaire."; 
                switch(data.progres.domaineEnCours)
                {
                  case "HTML": data.examen.echoue.HTML = data.examen.echoue.HTML + 1; break;
                  case "JavaScript": data.examen.echoue.JavaScript = data.examen.echoue.JavaScript + 1; break;
                  case "CSS": data.examen.echoue.CSS = data.examen.echoue.CSS + 1; break;
                  default: break;
                }
            }
            else if(Math.floor((data.progres.scoreEnCours / data.progres.nbQuestionsEnCours) * 100) < 50)
            {
                resultText = "Vous avez obtenu " + data.progres.scoreEnCours + "/" + data.progres.nbQuestionsEnCours + ". Une révision est recommandée.";
                switch(data.progres.domaineEnCours)
                {
                  case "HTML": data.examen.echoue.HTML = data.examen.echoue.HTML + 1; break;
                  case "JavaScript": data.examen.echoue.JavaScript = data.examen.echoue.JavaScript + 1; break;
                  case "CSS": data.examen.echoue.CSS = data.examen.echoue.CSS + 1; break;
                  default: break;
                }
            }
            else if(Math.floor((data.progres.scoreEnCours / data.progres.nbQuestionsEnCours) * 100) < 75)
            {
                resultText = "Vous avez obtenu " + data.progres.scoreEnCours + "/" + data.progres.nbQuestionsEnCours + ". La note de passage est atteinte, mais il faudrait réviser un peu quelques aspects.";
                switch(data.progres.domaineEnCours)
                {
                  case "HTML": data.examen.reussi.HTML = data.examen.reussi.HTML + 1; break;
                  case "JavaScript": data.examen.reussi.JavaScript = data.examen.reussi.JavaScript + 1; break;
                  case "CSS": data.examen.reussi.CSS = data.examen.reussi.CSS + 1; break;
                  default: break;
                }
            }
            else 
            {
                resultText = "Vous avez obtenu " + data.progres.scoreEnCours + "/" + data.progres.nbQuestionsEnCours + ". Ce résultat est satisfaisant.";  
                switch(data.progres.domaineEnCours)
                {
                  case "HTML": data.examen.reussi.HTML = data.examen.reussi.HTML + 1; break;
                  case "JavaScript": data.examen.reussi.JavaScript = data.examen.reussi.JavaScript + 1; break;
                  case "CSS": data.examen.reussi.CSS = data.examen.reussi.CSS + 1; break;
                  default: break;
                }
            }

            var examens = data.examensDetailles;
            var completedExam = {
                nom: "examen-" + data.progres.domaineEnCours + "-" + new Date().toLocaleString(),
                domaine : data.progres.domaineEnCours,
                score: data.progres.scoreEnCours,
                nbQuestions: data.progres.nbQuestionsEnCours
            };
            examens.push(completedExam);
            data.examensDetailles = examens;
            data.save(function(err) {
                if (err) res.send(err);
                else res.json(resultText);
            }); 
        }
        else
        {
            res.json("Désolé, il est difficile de vous évaluer avec " + data.progres.nbQuestionsEnCours + " question(s)..."); 
        }
   });
});

//**************************************************************************************************

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
