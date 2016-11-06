document.getElementById("submitExamen").onclick = save_configs;
document.getElementById("submitTestRapide").onclick = set_mode_rapide;
document.getElementById("reinitialiserStatistiques").onclick = resetAllStats;

document.getElementById("domaineChoice").onchange = checkQuestionsCount;

var examenEnCours;

update_Stats();
checkQuestionsCount();

check_if_exam_in_progress();

function resetAllStats()
{
    console.log("Delete all stats");
    $.ajax({ 
        url: '/api/stats',
        type: 'DELETE'
    });
}

function save_configs()
{
    if (examenEnCours)
    {
        $.post('/api/giveUp', function(data, status){
            $.post('/api/handleResult', function(data, status){
                $.ajax({
                    url: '/api/stats/progres',
                    type: 'DELETE',
                    success: function(result) {
                        var parametres = {"choix_domaine" : document.getElementById("domaineChoice").value, "choix_nombre" : document.getElementById("nombreQuestionsInput").value };
                        $.post('api/stats/progres/examen', parametres, function(data, status){
                            window.location.href = "/question/examen";
                        });
                    }
                });
            });
        });
    }
    else
    {
        var parametres = {"choix_domaine" : document.getElementById("domaineChoice").value, "choix_nombre" : document.getElementById("nombreQuestionsInput").value };
        $.post('api/stats/progres/examen', parametres, function(data, status){
            window.location.href = "/question/examen";
        });
    }
}

function set_mode_rapide()
{
    $.post('api/stats/progres/testrapide');
}

function update_Stats()
{
    $.get('api/stats', function(data, status) {

        var countHTMLgood = data.examen.reussi.HTML;
        var countHTMLwrong = data.examen.echoue.HTML;
        var countJavaScriptgood = data.examen.reussi.JavaScript; 
        var countJavaScriptwrong = data.examen.echoue.JavaScript; 
        var countCSSgood = data.examen.reussi.CSS; 
        var countCSSwrong = data.examen.echoue.CSS;

        var nbQuestionsReussiesTotal = countHTMLgood + countJavaScriptgood + countCSSgood;
        var nbQuestionsTotal = countHTMLwrong + countJavaScriptwrong + countCSSwrong + nbQuestionsReussiesTotal;
        var moyenne = ((nbQuestionsTotal != 0) ? Math.floor((nbQuestionsReussiesTotal / nbQuestionsTotal) * 100) : 0);

        var questionSucceedCount = data.testRapide.reussi;
        var questionFailCount = data.testRapide.echoue; 

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


        // On recupere les stats
        $.get('/api/stats/examens-detailles', function(data) {
            // Pour chaque examen dans les stats, on ajoute les infos dans la table detaillee
            data.forEach(function(element) { 
                var row = document.createElement("tr"); // creer une rangee

                var examName = document.createElement("td"); // creer la colonne nom
                var examNameText = document.createTextNode(element.nom);
                examName.appendChild(examNameText);

                var examDomaine = document.createElement("td"); // creer la colonne domaine
                var examDomaineText = document.createTextNode(element.domaine);
                examDomaine.appendChild(examDomaineText);

                var examScore = document.createElement("td"); // creer la colonne note
                var examScoreText = document.createTextNode(element.score + "/" + element.nbQuestions);
                examScore.appendChild(examScoreText);
                
                // ajouter tous les elements a la rangee
                row.appendChild(examName);
                row.appendChild(examDomaine);
                row.appendChild(examScore);
                document.getElementById("tableStats").appendChild(row); // ajouter la rangee a la table
            }, this);
        });
    });     
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
    $.get("/api/stats/progres", function(data){

        examenEnCours = data.examenEnCours;
        console.log(data);
        if (data.examenEnCours)
        {
            document.getElementById("continuerExamen").onclick = continue_exam;
            document.getElementById("continuerExamen").classList.remove("unseen");
        }
    });
}

function continue_exam()
{
    $.post('/api/continueExam', function(data, status){
        window.location.href = "/question/examen";
    });
}