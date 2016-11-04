var express = require('express');
var router = express.Router();

var db = require('../lib/db.js')
var mongoose = require( 'mongoose' );
var Questions = mongoose.model( 'Questions' )

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('dashboard', { title: 'Tableau de bord' });
});

module.exports = router;
