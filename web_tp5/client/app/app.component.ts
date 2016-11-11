import { Component  } from '@angular/core';
export class Question {
	domaine: string;
	question: string;
	reponse1: string;
	reponse2: string;
	reponse3: string;
	answer: string;
}

@Component({
  selector: 'mon-app',
  template: `
    <h1>{{title}}</h1>
    <p>{{value}}</p>
    <h2>{{question.domaine}}</h2>
    <h3>{{question.question}}</h3>
    <p>{{question.reponse1}}</p>
	<p>{{question.reponse2}}</p>
	<p>{{question.reponse3}}</p>
	<p>{{question.answer}}</p>
	<input [(ngModel)]="question.answer" placeholder="REPONSE">
	
	<mes-stats-detailles></mes-stats-detailles>
	
	`
})

export class AppComponent {
  title = "Tour of heroes";
  private value = "Tests";
  question: Question = {
	domaine: "HTML",
	question: "?",
	reponse1: "un",
	reponse2: "d",
	reponse3: "t",
	answer: "reponse1"
  };
}

