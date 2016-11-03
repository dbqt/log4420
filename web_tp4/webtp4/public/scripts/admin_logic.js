document.getElementById("envoyer").onclick = envoyerQuestion;

function envoyerQuestion()
{
	
	// TODO: VERIFIER LA SECURITE DE LA SAFETY
	
	var form_data = $("#adminform").serialize();
	var form_method = $("#adminform").attr("method").toUpperCase();
	
	$.ajax({
		url: "/api/addQuestion", 
		type: form_method,      
		data: form_data,
		datatype: "text",
		success: function(data)
		{                          
			alert("Question ajoutée avec succès!");
			 document.getElementById("adminform").reset();              
		},
		error: function(e)
		{
			console.log(e);
		}           
	});
	
}
