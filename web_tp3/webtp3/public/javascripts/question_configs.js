document.getElementById("submitExam").onclick = save_configs;
document.getElementById("submitRapide").onclick = set_mode_rapide;

function save_configs()
{
    var filledForm = document.getElementById("formConfigs");
    sessionStorage.setItem("choixDomaine", filledForm.elements["choix_domaine"].value);
    sessionStorage.setItem("choixNombre", filledForm.elements["choix_nombre"].value);
    sessionStorage.setItem("nbQuestionsCourant", 0);
    sessionStorage.setItem("mode", "exam");
}

function set_mode_rapide()
{
    sessionStorage.setItem("mode", "testrapide");
}