var domaine = sessionStorage.getItem("choixDomaine");
var nb = Number(sessionStorage.getItem("choixNombre")); 
var mode = sessionStorage.getItem("mode");
var currentAnswer;

var currentScore = 0;
var nbCurr = 0;

var zones = document.querySelectorAll('.choixDeReponse');
var zoneReponse = document.getElementById("zoneReponse");

document.getElementById("suivant").onclick = updateQuestion;
document.getElementById("abandonner").onclick = giveUp;

updateQuestion();

/***********************
 Mise à jour de la question
 ***********************/
function updateQuestion(){
    // Itérateur qui permet d'identifier où notre utilisateur est situé dans le questionnaire
    nbCurr = Number(sessionStorage.getItem("nbQuestionsCourant"));
    // Calculer le score du joueur pour la page "result" (seulement necessaire pour "examen")
    currentScore = Number(sessionStorage.getItem("currentScore"));

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
            currentAnswer = data.answer;

        });
    }
    else if(mode == "examen") 
    {
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
                currentAnswer = data.answer;

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

/***********************
 Abandonner
 ***********************/
function giveUp()
{
    if (mode == "testrapide")
    {
        window.location.href = "/dashboard";
    }
    else if(mode == "examen") 
    {
        sessionStorage.setItem("currentScore", 0);
        window.location.href = "/result/abandon";
    }
}

/***********************
 Event Listeners
 ***********************/

var elementBeingDragged = null;

function handleDragStart(e){
    // L'opacité de notre réponse choisie (que l'on commence à drag) est réduite.
    //e.target.style.opacity = "0.4"; 

    elementBeingDragged = e.target;

    // On détermine le type de drag-and-drop ici.
    e.dataTransfer.effectAllowed = "move";
    
    e.dataTransfer.setData("text/html", e.target.innerHTML);
    e.dataTransfer.setData("id", e.target.id)
}

function handleDragEnter(e) {
    // Si l'on approche un endroit où l'on peut drop, alors on utilise le style de over grâce à la classe ".column.over"
    if (e.target == zoneReponse)
    {
        e.target.classList.add("over");
    }
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    // On détermine le type de drag-and-drop ici.
    e.dataTransfer.dropEffect = "move";

    return false;
}

function handleDragLeave(e) {
    // Si l'on s'éloigne d'un endroit où l'on pouvait drop, alors on retire le style de over grâce à la classe ".column.over"
    e.target.classList.remove("over");
}

function handleDrop(e) {
    // e.target devrait être notre zone de réponse
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    if (e.target == zoneReponse && zoneReponse.innerHTML == "") {
        // On remplace le contenu de la zone de réponse par le contenu du choix de réponse
        e.target.innerHTML = e.dataTransfer.getData("text/html");

        // S'il s'agit de la bonne réponse (vérifié par le id du choix de réponse qui devrait correspondre avec currentAnswer)
        if (e.dataTransfer.getData("id") == currentAnswer)
        {
            // On associe le style vert de vérité
            zoneReponse.classList.add("vrai");

            // On incrémente le score du joueur et on affiche le nouveau score dans les statistiques en bas
            ++currentScore;
            sessionStorage.setItem("currentScore", currentScore);
            document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr;
            

        }
        else
        {
            // On associe le style rouge de fausseté
            zoneReponse.classList.add("faux");

            // On affiche le nouveau score dans les statistiques en bas
            document.getElementById("noteCourante").innerHTML = "Note actuelle: " + currentScore + "/" + nbCurr;

        }
        // On désactive les choix de réponse jusqu'à la prochaine question
        document.getElementById("reponse1").classList.add("disabled");
        document.getElementById("reponse2").classList.add("disabled");
        document.getElementById("reponse3").classList.add("disabled");
    }
    else
    {
        //elementBeingDragged.style.opacity = '1.0';
    }

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.

    [].forEach.call(zones, function (zone) {
        zone.classList.remove("over");
    });
}

[].forEach.call(zones, function (zone) {
    zone.addEventListener("dragstart", handleDragStart, false);
    zone.addEventListener("dragenter", handleDragEnter, false)
    zone.addEventListener("dragover", handleDragOver, false);
    zone.addEventListener("dragleave", handleDragLeave, false);
    zone.addEventListener("drop", handleDrop, false);
    zone.addEventListener("dragend", handleDragEnd, false);
});