import { Component, OnInit } from '@angular/core';
import { Question , QuestionForm}					from './question';
import { QuestionService }			from './question.service';
//import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-component',
  templateUrl: 'templates/admin'
})
export class AdminComponent{
	//TODO
  domaine = "HTML";
  question = "";
  reponse1= "";
  reponse2= "";
  reponse3= "";
  answer= "reponse1";
  
  	constructor(
		private questionService: QuestionService,
	) {
	    
	}
  
  sendQuestion() {


    this.questionService.addQuestion({"domaine":this.domaine, "question": this.question, "reponse1":this.reponse1, "reponse2":this.reponse2,"reponse3":this.reponse3, "answer":this.answer}).then(() => {this.domaine = "HTML";
      this.question = "";
      this.reponse1= "";
      this.reponse2= "";
      this.reponse3= "";
      this.answer= "reponse1";});
  }
  
  deleteQuestions() {
    this.questionService.deleteQuestions().then(() => {alert("Toutes les questions ont été effacées!"); });
	 
  }
}
