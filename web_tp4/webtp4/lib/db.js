var mongoose = require( 'mongoose' );
var random = require('mongosse-simple-random');

var Schema = mongoose.Schema;

var Questions = new Schema({
 domaine : String,
 question : String,
 reponse1 : String,
 reponse2 : String,
 reponse3 : String,
 answer : String
});
Questions.plugin(random);

var Stats = new Schema({
    testRapide : {
        reussi : Number,
        echoue : Number
    },
    examen : {
        reussi : {
            HTML : Number,
            JavaScript : Number,
            CSS : Number
        },
        echoue : {
            HTML : Number,
            JavaScript : Number,
            CSS : Number
        }
    },
    examensDetailles : [
        {
            nom: String,
            domaine : String,
            score : Number,
            nbQuestions : Number
        }
    ],
    progres : {
        examenEnCours: Boolean,
        domaineEnCours : String,
        scoreEnCours : Number,
        nbQuestionsEnCours : Number,
        numeroQuestionEnCours : Number
    }
});

mongoose.model( 'Questions', Questions );
mongoose.model( 'Stats', Stats );
// user: 'epicUser' 
// password: 'epicpassword1'
mongoose.connect( 'mongodb://epicUser:epicpassword1@ds050189.mlab.com:50189/tpweb' );
