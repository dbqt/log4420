var domaine = sessionStorage.getItem("choixDomaine");
var nb = Number(sessionStorage.getItem("choixNombre")); 
var mode = sessionStorage.getItem("mode");
var score = Number(sessionStorage.getItem("currentScore"));

var resultText;

// On genere le string avec le resultat
function generate_result()
{
    if (nb > 0)
    {
        if(Math.floor((score / nb) * 100) < 25)
        {
            resultText = "Vous avez obtenu " + score + "/" + nb + ". Une révision sérieuse est nécessaire."; 
            var examFailCount = Number(localStorage.getItem("examFailCount"+domaine));
			if (examFailCount == null)
			{
				examFailCount = 0;
			}
			localStorage.setItem("examFailCount"+domaine, examFailCount+1);
        }
        else if(Math.floor((score / nb) * 100) < 50)
        {
            resultText = "Vous avez obtenu " + score + "/" + nb + ". Une révision est recommandée.";
            var examFailCount = Number(localStorage.getItem("examFailCount"+domaine));
			if (examFailCount == null)
			{
				examFailCount = 0;
			}
			localStorage.setItem("examFailCount"+domaine, examFailCount+1);
        }
        else if(Math.floor((score / nb) * 100) < 75)
        {
            resultText = "Vous avez obtenu " + score + "/" + nb + ". La note de passage est atteinte, mais il faudrait réviser un peu quelques aspects.";
            var examSuccessCount = Number(localStorage.getItem("examSuccessCount"+domaine));
			if (examSuccessCount == null)
			{
				examSuccessCount = 0;
			}
			localStorage.setItem("examSuccessCount"+domaine, examSuccessCount+1);
        }
        else 
        {
            resultText = "Vous avez obtenu " + score + "/" + nb + ". Ce résultat est satisfaisant.";  
            var examSuccessCount = Number(localStorage.getItem("examSuccessCount"+domaine));
			if (examSuccessCount == null)
			{
				examSuccessCount = 0;
			}
			localStorage.setItem("examSuccessCount"+domaine, examSuccessCount+1);
        }
        update_statistics();
    }
    else
    {
        resultText = "Désolé, il est difficile de vous évaluer avec " + nb + " question(s)..."; 
    }
    document.getElementById("resultat").innerHTML = resultText;
}

// On met à jour les statistiques
function update_statistics()
{
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
}
