$.post("/api/handleResult", function(data, status){

    document.getElementById("resultat").innerHTML = data;

    $.ajax({
        url: '/api/stats/progres',
        type: 'DELETE'
    });

});