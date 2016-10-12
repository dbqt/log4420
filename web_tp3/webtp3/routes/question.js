var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/testrapide'/*:mode/:nb'*/, function(req, res, next) {
    
  res.render('question', { 
      title: 'Question',
      mode: "testrapide",
      nb: 1,
      domaine: "domaine",
      question: "question",
      reponse1: "reponse1",
      reponse2: "reponse2",
      reponse3: "reponse3"
  });
});

router.post('/examen'/*:mode/:nb'*/, function(req, res, next) {
  res.render('question', { 
      title: 'Question',
      mode: "examen",
      nb: 1,
      domaine: "domaine",
      question: "question",
      reponse1: "reponse1",
      reponse2: "reponse2",
      reponse3: "reponse3"
  });
});

module.exports = router;
