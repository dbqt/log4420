var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Questions = new Schema({
 domaine : String,
 question : String,
 reponse1 : String,
 reponse2 : String,
 reponse3 : String,
 answer : String
});

var Userbase = new Schema({
    name : String,
});

mongoose.model( 'Questions', Questions );
mongoose.model( 'Userbase', Userbase );
// user: 'epicUser' 
// password: 'epicpassword1'
mongoose.connect( 'mongodb://epicUser:epicpassword1@ds050189.mlab.com:50189/tpweb' );
