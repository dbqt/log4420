var questionId;

var zones = document.querySelectorAll('.choixDeReponse');
var zoneReponse = document.getElementById("zoneReponse");

document.getElementById("suivant").onclick = updateQuestion;
document.getElementById("abandonner").onclick = giveUp;

// Nouveau systeme
var domaineEnCours;
var scoreEnCours;
var numeroQuestionEnCours;
var nbQuestionsEnCours;

$.get("/api/getMode", function(data, status){
    mode = data;
    updateQuestion();
});

/***********************
 Mise à jour de la question
 ***********************/
function updateQuestion(){
    $.get("/api/stats/progres", function(data, status) {
        console.log(data);
        numeroQuestionEnCours = data.numeroQuestionEnCours;
        nbQuestionsEnCours = data.nbQuestionsEnCours;
        scoreEnCours = data.scoreEnCours;

        if (mode != "testrapide" && data.numeroQuestionEnCours <= data.nbQuestionsEnCours){document.getElementById("numerotation").innerHTML = "Question "+ data.numeroQuestionEnCours + "/" + data.nbQuestionsEnCours;}
        if (mode != "testrapide") document.getElementById("noteCourante").innerHTML = "Note actuelle: " + data.scoreEnCours + "/" + data.nbQuestionsEnCours;

        updateQuestionTexts();
    }); 
}

function updateQuestionTexts()
{
    $('#suivant').attr('disabled', 'disabled');
    if(mode == "testrapide") 
    {
        $.get("/api/next", function(data, status) {
            
            questionId = data._id;

            document.getElementById("domaine").innerHTML = data.domaine;
            document.getElementById("question").innerHTML = data.question;
            document.getElementById("reponse1").innerHTML = data.reponse1;
            document.getElementById("reponse2").innerHTML = data.reponse2;
            document.getElementById("reponse3").innerHTML = data.reponse3;   

            $.get("/api/stats/progres", function(data, status) {
                numeroQuestionEnCours = data.numeroQuestionEnCours;
                nbQuestionsEnCours = data.nbQuestionsEnCours;
                scoreEnCours = data.scoreEnCours;
            }); 
        });
    }
    else if(mode == "examen") 
    {
        if(numeroQuestionEnCours > nbQuestionsEnCours) 
        {
            document.getElementById("noteCourante").innerHTML = "Note actuelle: " + scoreEnCours + "/" + nbQuestionsEnCours;
            window.location.href = "/result";
        }
        else
        {
            $.get("/api/next", function(data, status) {

                questionId = data._id;

                document.getElementById("domaine").innerHTML = data.domaine;
                document.getElementById("question").innerHTML = data.question;
                document.getElementById("reponse1").innerHTML = data.reponse1;
                document.getElementById("reponse2").innerHTML = data.reponse2;
                document.getElementById("reponse3").innerHTML = data.reponse3;
                
                $.get("/api/stats/progres", function(data, status) {

                    numeroQuestionEnCours = data.numeroQuestionEnCours;
                    nbQuestionsEnCours = data.nbQuestionsEnCours;
                    scoreEnCours = data.scoreEnCours;

                    if (mode != "testrapide" && data.numeroQuestionEnCours <= data.nbQuestionsEnCours){document.getElementById("numerotation").innerHTML = "Question "+ data.numeroQuestionEnCours + "/" + data.nbQuestionsEnCours;}
                    if (mode != "testrapide") document.getElementById("noteCourante").innerHTML = "Note actuelle: " + data.scoreEnCours + "/" + data.nbQuestionsEnCours;

                }); 
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
        $.post("/api/giveUp", function(data, status) {
            window.location.href = "/result/abandon";
        });
    }
}

/***********************
 Event Listeners
 ***********************/

var elementBeingDragged = null;

function handleDragStart(e){
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
    if (e.target.classList != undefined){
		e.target.classList.remove("over");
	}
}

function handleDrop(e) {
    // e.target devrait être notre zone de réponse
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    if (e.target == zoneReponse && zoneReponse.innerHTML == "") {
        $('#suivant').removeAttr("disabled");
        // On remplace le contenu de la zone de réponse par le contenu du choix de réponse
        e.target.innerHTML = e.dataTransfer.getData("text/html");

        var dataToSend = {questionId: questionId, reponseChoisie: e.dataTransfer.getData("id")};

        $.ajax({
            url: "/api/verifyAnswer", 
            type: "POST",
            data: dataToSend,
            datatype: "text",
            success: function(data)
            {
                // On associe la bonne couleur pour la zoneReponse
                if (data == 1 ? zoneReponse.classList.add("vrai") : zoneReponse.classList.add("faux"));

                // On met à jour le score
                $.get("/api/stats/progres", function(data, status) {
                    if (mode != "testrapide") document.getElementById("noteCourante").innerHTML = "Note actuelle: " + data.scoreEnCours + "/" + data.nbQuestionsEnCours;
                }); 

                // On désactive les choix de réponse jusqu'à la prochaine question
                document.getElementById("reponse1").classList.add("disabled");
                document.getElementById("reponse2").classList.add("disabled");
                document.getElementById("reponse3").classList.add("disabled");
            },
            error: function(e)
            {
                console.log(e);
            }           
        });
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
