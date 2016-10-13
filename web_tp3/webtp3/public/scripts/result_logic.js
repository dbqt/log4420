var domaine = sessionStorage.getItem("choixDomaine");
var nb = Number(sessionStorage.getItem("choixNombre")); 
var mode = sessionStorage.getItem("mode");
var score = Number(sessionStorage.getItem("currentScore"));

var resultText = "Vous avez obtenu " + score + "/" + nb + "."; 
document.getElementById("resultat").innerHTML = resultText;

// On met à jour les statistiques

// "statistics" est un array de JSON Objects, mais les items du localStorage sont des Strings.
// On convertie l'item pour avoir un array de JSON Objects.
var statsArray = [];
if (localStorage.getItem("examScores") != null)
{
    statsArray = $.parseJSON(localStorage.getItem("examScores"));
}
var examId = statsArray.length + 1;
var completedExam = {
    nom: "Examen " + examId,
    domaine: domaine,
    score: score,
    nb: nb
};

// On ajoute l'examen complété dans les statistiques
statsArray.push(completedExam);
localStorage.setItem("examScores", JSON.stringify(statsArray));

// On met à jour le nombre de questions réussies au total
var nbQuestionsReussiesTotal = score;
if (localStorage.getItem("nbQuestionsReussiesTotal") != null)
{
    nbQuestionsReussiesTotal += Number(localStorage.getItem("nbQuestionsReussiesTotal"));
}
localStorage.setItem("nbQuestionsReussiesTotal", nbQuestionsReussiesTotal);

// On met à jour le nombre de questions au total
var nbQuestionsTotal = nb;
if (localStorage.getItem("nbQuestionsTotal") != null)
{
    nbQuestionsTotal += Number(localStorage.getItem("nbQuestionsTotal"));
}
localStorage.setItem("nbQuestionsTotal", nbQuestionsTotal);

console.log(localStorage);