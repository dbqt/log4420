document.getElementById("submitExamen").onclick = save_configs;
document.getElementById("submitTestRapide").onclick = set_mode_rapide;
//document.getElementById("reinitialiserStatistiques").onclick = localStorage.clear(); // localStorage est uniquement utilisé pour les statistiques du joueur

var nbQuestionsReussiesTotal = ((localStorage.getItem("nbQuestionsReussiesTotal") != null) ? Number(localStorage.getItem("nbQuestionsReussiesTotal")) : 0);
var nbQuestionsTotal = ((localStorage.getItem("nbQuestionsTotal") != null) ? Number(localStorage.getItem("nbQuestionsTotal")) : 0);
var moyenne = ((nbQuestionsTotal != 0) ? Math.floor((nbQuestionsReussiesTotal / nbQuestionsTotal) * 100) : 0);

var countHTMLgood = ((localStorage.getItem("examSuccessCountHTML") != null) ? Number(localStorage.getItem("examSuccessCountHTML")) : 0);
var countHTMLwrong = ((localStorage.getItem("examFailCountHTML") != null) ? Number(localStorage.getItem("examFailCountHTML")) : 0);
var countJavaScriptgood = ((localStorage.getItem("examSuccessCountJavaScript") != null) ? Number(localStorage.getItem("examSuccessCountJavaScript")) : 0);
var countJavaScriptwrong = ((localStorage.getItem("examFailCountJavaScript") != null) ? Number(localStorage.getItem("examFailCountJavaScript")) : 0);
var countCSSgood = ((localStorage.getItem("examSuccessCountCSS") != null) ? Number(localStorage.getItem("examSuccessCountCSS")) : 0);
var countCSSwrong = ((localStorage.getItem("examFailCountCSS") != null) ? Number(localStorage.getItem("examFailCountCSS")) : 0);

console.log(localStorage);

var questionSucceedCount = ((localStorage.getItem("questionSucceedCount") != null) ? Number(localStorage.getItem("questionSucceedCount")) : 0);
var questionFailCount = ((localStorage.getItem("questionFailCount") != null) ? Number(localStorage.getItem("questionFailCount")) : 0);

document.getElementById("nombreQuestionsReussies").innerHTML = "Nombre de questions d'examen réussies total: " + nbQuestionsReussiesTotal + "/" + nbQuestionsTotal;
document.getElementById("moyenneExamens").innerHTML = "Moyenne des examens: " + moyenne + "%";

document.getElementById("countHTMLgood").innerHTML = "Nombre d'examens réussis en HTML: " + countHTMLgood;
document.getElementById("countHTMLwrong").innerHTML = "Nombre d'examens échoués en HTML: " + countHTMLwrong;
document.getElementById("countJavaScriptgood").innerHTML = "Nombre d'examens réussis en JavaScript: " + countJavaScriptgood;
document.getElementById("countJavaScriptwrong").innerHTML = "Nombre d'examens échoués en JavaScript: " + countJavaScriptwrong;
document.getElementById("countCSSgood").innerHTML = "Nombre d'examens réussis en CSS: " + countCSSgood;
document.getElementById("countCSSwrong").innerHTML = "Nombre d'examens échoués en CSS: " + countCSSwrong;

document.getElementById("questionSucceedCount").innerHTML = "Nombre de questions rapides réussies: " + questionSucceedCount;
document.getElementById("questionFailCount").innerHTML = "Nombre de questions rapides échouées: " + questionFailCount;

document.getElementById("domaineChoice").onchange = checkQuestionsCount;

update_Stats();
checkQuestionsCount();


// CONTINUER UN EXAMEN

var domaineEnCours;
var scoreEnCours;
var nbQuestionsEnCours;
var nombreQuestionEnCours;

check_if_exam_in_progress();

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

function update_Stats()
{
    // On recupere les stats
    var statsArray = [];
    if (localStorage.getItem("examScores") != null)
    {
        statsArray = $.parseJSON(localStorage.getItem("examScores"));
    }
    // Pour chaque examen dans les stats, on ajoute les infos dans la table detaillee
    statsArray.forEach(function(element) { 
        var row = document.createElement("tr"); // creer une rangee

        var examName = document.createElement("td"); // creer la colonne nom
        var examNameText = document.createTextNode(element.nom);
        examName.appendChild(examNameText);

        var examDomaine = document.createElement("td"); // creer la colonne domaine
        var examDomaineText = document.createTextNode(element.domaine);
        examDomaine.appendChild(examDomaineText);

        var examScore = document.createElement("td"); // creer la colonne note
        var examScoreText = document.createTextNode(element.score + "/" + element.nb);
        examScore.appendChild(examScoreText);
        
        // ajouter tous les elements a la rangee
        row.appendChild(examName);
        row.appendChild(examDomaine);
        row.appendChild(examScore);
        document.getElementById("tableStats").appendChild(row); // ajouter la rangee a la table
    }, this);   
}



function checkQuestionsCount()
{
	$.get("/api/nbQuestionsMax", function(data){                          
        switch(document.getElementById("domaineChoice").value)
        {
            case "HTML":
                document.getElementById("nombreQuestionsInput").max = data.HTML;
                break;
            
            case "JavaScript":
                document.getElementById("nombreQuestionsInput").max = data.JavaScript;
                break;
            
            case "CSS":
                document.getElementById("nombreQuestionsInput").max = data.CSS;
                break;
            
            default:
                console.log("Mauvais choix de domaine...");
                break;
        }        
    });
	document.getElementById("nombreQuestionsInput").value = 1;
}

function check_if_exam_in_progress()
{
    $.get("/api/nbQuestionsMax", function(data){
        if (data.examenEnCours)
        {
            domaineEnCours = data.domaine;
            scoreEnCours = data.score;
            nbQuestionsEnCours = data.nb;
            nombreQuestionEnCours = data.nombreQuestionEnCours;
            document.getElementById("continuerExamen").onclick = continue_exam;
        }
    });
}

function continue_exam()
{

/*
    $.post("/api/reset", {}, function(data, status){
        console.log("OK");
    });
*/
    /*
    $.post("/continuerExamen", {
        domaineEnCours: domaineEnCours,
        scoreEnCours: scoreEnCours,
        nbQuestionsEnCours: nbQuestionsEnCours,
        nombreQuestionEnCours: nombreQuestionEnCours
    }, function(data, status) {
        // Nothing?
    });
    */
}