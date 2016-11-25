document.getElementById("envoyer").onclick = envoyerQuestion;
document.getElementById("toutdelete").onclick = effacerTousQuestions;

function envoyerQuestion()
{	
	var form_data = $("#adminform").serialize();
	var form_method = $("#adminform").attr("method").toUpperCase();
	
	$.ajax({
		url: "/api/question", 
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
			alert("La question n'a pas été ajoutée \n Vérifier que les valeurs sont valides.");
			console.log(e);
		}           
	});	
}

function effacerTousQuestions()
{
	$.ajax({
		url: "/api/question", 
		type: 'DELETE',
		success: function(data)
		{                          
			alert("Toutes les questions ont été effacées!");           
		},
		error: function(e)
		{
			alert("e");
			console.log(e);
		}           
	});
}