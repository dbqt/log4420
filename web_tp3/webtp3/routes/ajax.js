var express = require('express');
var pseudoBD = require('./../data/pseudoBD');
var $ = require('jQuery');

var router = express.Router();

/* GET base api. */
router.get('/', function(req, res, next) {
  res.json({data: "test", id: 12123, table: [4, 3, 2 ,1 ,0], dict: {a : 'A', b: 'B', c: 'C'}})
});

/* GET questions api. */
router.post('/questions', function(req, res, next) {
    console.log(req.body.domaine);
    console.log(req.body.nombredequestions);
  var random = Math.floor(Math.random() * pseudoBD.length);
  res.json(pseudoBD[random]);
});

module.exports = router;