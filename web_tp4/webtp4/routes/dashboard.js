var express = require('express');
var router = express.Router();

var db = require('../lib/db.js')
var mongoose = require( 'mongoose' );
var Questions = mongoose.model( 'Questions' )

/* GET home page. */
router.get('/', function(req, res, next) {
  /* Aggretate db to have something like
  { _id: 'JavaScript', count: 1 },
  { _id: 'CSS', count: 1 },
  { _id: 'HTML', count: 14 } ]*/
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
            res.render('dashboard', { title: 'Tableau de bord', domaineNb: domaineCount });
        }
   });
});

module.exports = router;
