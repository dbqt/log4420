var questionId;
var currentScore = 0;
var nbCurr = 0;

var zones = document.querySelectorAll('.choixDeReponse');
var zoneReponse = document.getElementById("zoneReponse");

document.getElementById("suivant").onclick = nextQuestion;
document.getElementById("abandonner").onclick = giveUp;

// Nouveau systeme
var domaineEnCours;
var scoreEnCours;
var nbQuestionsEnCours;
var nombreQuestionEnCours;

$.get("/api/progres", function(data, status) {
    domaineEnCours = data.domaine;
    scoreEnCours = data.score;
    nbQuestionsEnCours = data.nb;
    nombreQuestionEnCours = data.nombreQuestionEnCours;
});




/***********************
 Mise à jour de la question
 ***********************/
function nextQuestion(){

    if(mode == "testrapide") 
    {
        $.get("/api/questions", function(data, status) {

            ++nbCurr;
            sessionStorage.setItem("nbQuestionsCourant", nbCurr);

            document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr;

            document.getElementById("domaine").innerHTML = data.domaine;
            document.getElementById("question").innerHTML = data.question;
            document.getElementById("reponse1").innerHTML = data.reponse1;
            document.getElementById("reponse2").innerHTML = data.reponse2;
            document.getElementById("reponse3").innerHTML = data.reponse3;

            questionId = data._id;

        });
    }
    else if(mode == "examen") 
    {

        $.ajax({
            url: '/api/progres',
            type: 'PUT',
            data: "scoreEnCours=scoreEnCours&nombreQuestionEnCours=nombreQuestionEnCours",
            success: function(data) {
                alert('Load was performed.');
            }
        });






        if(nbCurr >= nb) 
        {
            document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr;
            window.location.href = "/result";
        }
        else
        {

            $.post("/api/questions", 
            {domaine: domaine, nombredequestions: nb, currentNb:nbCurr}, 
            function(data, status) {

                document.getElementById("domaine").innerHTML = data.domaine;
                document.getElementById("question").innerHTML = data.question;
                document.getElementById("reponse1").innerHTML = data.reponse1;
                document.getElementById("reponse2").innerHTML = data.reponse2;
                document.getElementById("reponse3").innerHTML = data.reponse3;

                questionId = data._id;
                
                ++nbCurr;
                sessionStorage.setItem("nbQuestionsCourant", nbCurr);
                document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr;
                document.getElementById("numerotation").innerHTML = "Question "+ nbCurr + "/" + nb;
            });

        }
         
    }

    document.getElementById("reponse1").classList.remove("disabled");
    document.getElementById("reponse2").classList.remove("disabled");
    document.getElementById("reponse3").classList.remove("disabled");
    zoneReponse.classList.remove("vrai");
    zoneReponse.classList.remove("faux");
    zoneReponse.innerHTML = "";

}