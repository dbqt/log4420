document.getElementById("submitExamen").onclick = save_configs;
document.getElementById("submitTestRapide").onclick = set_mode_rapide;
//document.getElementById("reinitialiserStatistiques").onclick = localStorage.clear(); // localStorage est uniquement utilisé pour les statistiques du joueur

console.log(localStorage);
var nbQuestionsReussiesTotal = ((localStorage.getItem("nbQuestionsReussiesTotal") != null) ? Number(localStorage.getItem("nbQuestionsReussiesTotal")) : 0);
var nbQuestionsTotal = ((localStorage.getItem("nbQuestionsTotal") != null) ? Number(localStorage.getItem("nbQuestionsTotal")) : 0);
var moyenne = ((nbQuestionsTotal != 0) ? Math.floor((nbQuestionsReussiesTotal / nbQuestionsTotal) * 100) : 0);

document.getElementById("nombreQuestionsReussies").innerHTML = "Nombre de questions réussies: " + nbQuestionsReussiesTotal + "/" + nbQuestionsTotal;
document.getElementById("moyenneExamens").innerHTML = "Moyenne des examens: " + moyenne + "%";

function save_configs()
{
    var filledForm = document.getElementById("formConfigs");
    sessionStorage.setItem("choixDomaine", filledForm.elements["choix_domaine"].value);
    sessionStorage.setItem("choixNombre", filledForm.elements["choix_nombre"].value);
    sessionStorage.setItem("nbQuestionsCourant", 0);
    sessionStorage.setItem("mode", "examen");
    sessionStorage.setItem("currentScore", 0);
}

function set_mode_rapide()
{
    sessionStorage.setItem("choixDomaine", "Tous");
    sessionStorage.setItem("choixNombre", -1);
    sessionStorage.setItem("nbQuestionsCourant", 0);
    sessionStorage.setItem("mode", "testrapide");
    sessionStorage.setItem("currentScore", 0);
}