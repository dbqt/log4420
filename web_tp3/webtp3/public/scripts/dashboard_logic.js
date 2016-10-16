document.getElementById("submitExamen").onclick = save_configs;
document.getElementById("submitTestRapide").onclick = set_mode_rapide;
//document.getElementById("reinitialiserStatistiques").onclick = localStorage.clear(); // localStorage est uniquement utilisé pour les statistiques du joueur

var nbQuestionsReussiesTotal = ((localStorage.getItem("nbQuestionsReussiesTotal") != null) ? Number(localStorage.getItem("nbQuestionsReussiesTotal")) : 0);
var nbQuestionsTotal = ((localStorage.getItem("nbQuestionsTotal") != null) ? Number(localStorage.getItem("nbQuestionsTotal")) : 0);
var moyenne = ((nbQuestionsTotal != 0) ? Math.floor((nbQuestionsReussiesTotal / nbQuestionsTotal) * 100) : 0);

document.getElementById("nombreQuestionsReussies").innerHTML = "Nombre de questions réussies: " + nbQuestionsReussiesTotal + "/" + nbQuestionsTotal;
document.getElementById("moyenneExamens").innerHTML = "Moyenne des examens: " + moyenne + "%";

update_Stats();

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
        var examScoreText = document.createTextNode((element.score*100/element.nb).toFixed(2) + " %");
        examScore.appendChild(examScoreText);
        
        // ajouter tous les elements a la rangee
        row.appendChild(examName);
        row.appendChild(examDomaine);
        row.appendChild(examScore);
        document.getElementById("tableStats").appendChild(row); // ajouter la rangee a la table
    }, this);   
}