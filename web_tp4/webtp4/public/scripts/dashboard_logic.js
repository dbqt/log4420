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
        type: 'DELETE',
        success : function() {
            update_Stats();
        }
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

        var questionSucceedCount = data.testRapide.reussi;
        var questionFailCount = data.testRapide.echoue; 

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
            var scoreTotal = 0;
            var nbQuestionsTotal = 0;
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
                scoreTotal += element.score;
                nbQuestionsTotal += element.nbQuestions;

                // ajouter tous les elements a la rangee
                row.appendChild(examName);
                row.appendChild(examDomaine);
                row.appendChild(examScore);
                document.getElementById("tableStats").appendChild(row); // ajouter la rangee a la table
            }, this);

            var moyenne = ((nbQuestionsTotal != 0) ? Math.floor((scoreTotal / nbQuestionsTotal) * 100) : 0);
            document.getElementById("nombreQuestionsReussies").innerHTML = "Nombre de questions d'examen réussies total: " + scoreTotal + "/" + nbQuestionsTotal;
            document.getElementById("moyenneExamens").innerHTML = "Moyenne des examens: " + moyenne + "%";
        });
    });     
}



function checkQuestionsCount()
{
	$.get("/api/nbQuestionsMax", function(data){   
        var min = 1;
        var max = 1;             
        switch(document.getElementById("domaineChoice").value)
        {
            case "HTML":
                max = data.HTML;
                if(data.HTML == null) { 
                    min = 0;
                    max = 0;
                }
                break;
            case "JavaScript":
                max = data.JavaScript;
                if(data.JavaScript == null) { 
                    min = 0;
                    max = 0;
                }
                break;
            case "CSS":
                max = data.CSS;
                if(data.CSS == null) { 
                    min = 0;
                    max = 0;
                }
                break;
            default:
                console.log("Mauvais choix de domaine...");
                break;
        } 
        document.getElementById("nombreQuestionsInput").max = max; 
        document.getElementById("nombreQuestionsInput").min = min;  
        document.getElementById("nombreQuestionsInput").value = min;
        console.log("min:" + min + " , max: " + max);
        if(min == 0 || max == 0) $("#submitExamen").attr('disabled', 'disabled');
        else $("#submitExamen").removeAttr("disabled"); 
    });
	
}

function check_if_exam_in_progress()
{
    $.get("/api/stats/progres", function(data){

        examenEnCours = data.examenEnCours;
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