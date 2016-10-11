document.getElementById("suivant").onclick = updateQuestion;
updateQuestion();

function updateQuestion(){
    var domaine = sessionStorage.getItem("choixDomaine");
    var nb = sessionStorage.getItem("choixNombre"); 
    var nbCurr = Number(sessionStorage.getItem("nbQuestionsCourant"));
    var mode = sessionStorage.getItem("mode");

     
    // Retrieve from pseudoBD

    if(mode == "testrapide") 
    {
        $.get("/api/questions", function(data, status) {
            //update html
            console.log(data);
            var answer = data.answer;
            document.getElementById("domaine").innerHTML = data.domaine;
            document.getElementById("question").innerHTML = data.question;
            document.getElementById("reponse1").innerHTML = data.reponse1;
            document.getElementById("reponse2").innerHTML = data.reponse2;
            document.getElementById("reponse3").innerHTML = data.reponse3;
        });
    }
    else if(mode == "exam") 
    {
        if(nbCurr >= nb) 
        {
            window.location.href = "/result";
        }
        else
        {
            $.post("/api/questions", 
            {domaine: domaine, nombredequestions: nb, currentNb:nbCurr}, 
            function(data, status) {
                var answer = data.answer;
                document.getElementById("domaine").innerHTML = data.domaine;
                document.getElementById("question").innerHTML = data.question;
                document.getElementById("reponse1").innerHTML = data.reponse1;
                document.getElementById("reponse2").innerHTML = data.reponse2;
                document.getElementById("reponse3").innerHTML = data.reponse3;
            });
            nbCurr++;
            sessionStorage.setItem("nbQuestionsCourant", nbCurr);
            document.getElementById("numerotation").innerHTML = "Question "+ nbCurr + "/" + nb;
        }
         
    }

    /*{id: 11, domaine: "CSS", question: "Que veut dire CSS?", reponse1: "C'mon Sarcasm Sometimes", reponse2: "Cascade Style Sheet"…}*/

}
