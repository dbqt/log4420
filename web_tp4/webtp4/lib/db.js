var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var Questions = new Schema({
 id : Number,
 domaine : String,
 question : String,
 reponse1 : String,
 reponse2 : String,
 reponse3 : String,
 answer : String
});

mongoose.model( 'Questions', Questions );
// user: 'epicUser' 
// password: 'epicpassword1'
mongoose.connect( 'mongodb://epicUser:epicpassword1@ds050189.mlab.com:50189/tpweb' );