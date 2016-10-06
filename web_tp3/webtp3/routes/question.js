var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/'/*:mode/:nb'*/, function(req, res, next) {
    
    /*
    if(req.params.nb == 1){
        var domaine = "HTML"
        var question = "Que signifie HTML?"
        var reponse1 = "Hello Tout Monde Le"
        var reponse2 = "Hyper Text Markup Language"
        var reponse3 = "Ham Tarte Mûre Lait"
    }
    else if(req.params.nb == 2){
        var domaine = "CSS"
        var question = "Que veut dire CSS?"
        var reponse1 = "C'mon Sarcasm Sometimes"
        var reponse2 = "Cascade Style Sheet"
        var reponse3 = "Coding Solo Style"
    }*/
  res.render('question', { 
      title: 'Question',
      mode: "mode",
      nb: 1,
      domaine: "domaine",
      question: "question",
      reponse1: "reponse1",
      reponse2: "reponse2",
      reponse3: "reponse3"
      /*mode: req.params.mode,
      nb: req.params.nb,
      domaine: domaine,
      question: question,
      reponse1: reponse1,
      reponse2: reponse2,
      reponse3: reponse3*/
  });
});

module.exports = router;
