var express = require('express');
var router = express.Router();


/* GET testrapide. */
router.get('/testrapide'/*:mode/:nb'*/, function(req, res, next) {
    
  res.render('question', { 
      title: 'Question',
      mode: "testrapide",
      domaine: "domaine",
      question: "question",
      reponse1: "reponse1",
      reponse2: "reponse2",
      reponse3: "reponse3"
  });
});

/* GET examen */
router.get('/examen'/*:mode/:nb'*/, function(req, res, next) {
  res.render('question', { 
      title: 'Question',
      mode: "examen",
      domaine: "domaine",
      question: "question",
      reponse1: "reponse1",
      reponse2: "reponse2",
      reponse3: "reponse3"
  });
});
/* POST examen */
router.post('/examen'/*:mode/:nb'*/, function(req, res, next) {
  res.render('question', { 
      title: 'Question',
      mode: "examen",
      domaine: "domaine",
      question: "question",
      reponse1: "reponse1",
      reponse2: "reponse2",
      reponse3: "reponse3"
  });
});

module.exports = router;
