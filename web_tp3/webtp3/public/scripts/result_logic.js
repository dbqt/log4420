var domaine = sessionStorage.getItem("choixDomaine");
var nb = sessionStorage.getItem("choixNombre"); 
var mode = sessionStorage.getItem("mode");
var score = Number(sessionStorage.getItem("currentScore"));

var resultText = "Vous avez obtenu " + score + "/" + nb + "."; 
document.getElementById("resultat").innerHTML = resultText;

// On met à jour les statistiques
var completedExam = {
    nom: "Examen",
    domaine: domaine,
    score: score,
    nb: nb
};
// "statistics" est un array de JSON Objects, mais les items du localStorage sont des Strings.
// On convertie l'item pour avoir un array de JSON Objects.
var statsArray = [];
if (localStorage.getItem("examScores") != null)
{
    statsArray = $.parseJSON(localStorage.getItem("statistics"));
}
// On ajoute l'examen complété dans les statistiques
statsArray.push(completedExam);
localStorage.setItem("statistics", JSON.stringify(statsArray));