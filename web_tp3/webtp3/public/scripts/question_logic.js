var domaine = sessionStorage.getItem("choixDomaine");
var nb = Number(sessionStorage.getItem("choixNombre")); 
var mode = sessionStorage.getItem("mode");
var currentAnswer;


document.getElementById("suivant").onclick = updateQuestion;
document.getElementById("abandonner").onclick = giveUp;
updateQuestion();

function updateQuestion(){
    // Itérateur qui permet d'identifier où notre utilisateur est situé dans le questionnaire
    var nbCurr = Number(sessionStorage.getItem("nbQuestionsCourant"));
    // Calculer le score du joueur pour la page "result" (seulement necessaire pour "examen")
    var currentScore = Number(sessionStorage.getItem("currentScore"));

    if(mode == "testrapide") 
    {
        $.get("/api/questions", function(data, status) {

            if (document.querySelector('input[name="answer"]:checked') != null && document.querySelector('input[name="answer"]:checked').value == currentAnswer)
            {
                ++currentScore;
                sessionStorage.setItem("currentScore", currentScore);
            }

            document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr;

            ++nbCurr;
            sessionStorage.setItem("nbQuestionsCourant", nbCurr);

            document.getElementById("domaine").innerHTML = data.domaine;
            document.getElementById("question").innerHTML = data.question;
            document.getElementById("reponse1").innerHTML = data.reponse1;
            document.getElementById("reponse2").innerHTML = data.reponse2;
            document.getElementById("reponse3").innerHTML = data.reponse3;
            currentAnswer = data.answer;
        });
    }
    else if(mode == "examen") 
    {
        if(nbCurr >= nb) 
        {
            if (document.querySelector('input[name="answer"]:checked') != null && document.querySelector('input[name="answer"]:checked').value == currentAnswer)
            {
                ++currentScore;
                sessionStorage.setItem("currentScore", currentScore);
            }

            document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr + " (sur " + nb + " questions)"; // Facultatif ici
            
            window.location.href = "/result";
        }
        else
        {

            $.post("/api/questions", 
            {domaine: domaine, nombredequestions: nb, currentNb:nbCurr}, 
            function(data, status) {

                // Si une reponse a été cochée ET que c'est la bonne, on incrémente le score du joueur.
                // Ceci fera nécessairement rien à la première exécution puisque rien sera initialement coché.
                if (document.querySelector('input[name="answer"]:checked') != null && document.querySelector('input[name="answer"]:checked').value == currentAnswer)
                {
                    ++currentScore;
                    sessionStorage.setItem("currentScore", currentScore);
                }
                document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr + " (sur " + nb + " questions)";

                document.getElementById("domaine").innerHTML = data.domaine;
                document.getElementById("question").innerHTML = data.question;
                document.getElementById("reponse1").innerHTML = data.reponse1;
                document.getElementById("reponse2").innerHTML = data.reponse2;
                document.getElementById("reponse3").innerHTML = data.reponse3;
                currentAnswer = data.answer;

                ++nbCurr;
                sessionStorage.setItem("nbQuestionsCourant", nbCurr);
                document.getElementById("numerotation").innerHTML = "Question "+ nbCurr + "/" + nb;
            });
        }
         
    }

    /*{id: 11, domaine: "CSS", question: "Que veut dire CSS?", reponse1: "C'mon Sarcasm Sometimes", reponse2: "Cascade Style Sheet"…}*/

}

function giveUp()
{
    if (mode == "testrapide")
    {
        window.location.href = "/dashboard";
    }
    else if(mode == "examen") 
    {
        sessionStorage.setItem("currentScore", 0);
        window.location.href = "/result";
    }
}