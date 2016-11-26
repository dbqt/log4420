import { Component, OnInit }		from '@angular/core';
import { Router }            from '@angular/router';

import { Question }					from './question';
import { QuestionService }			from './question.service';


@Component({
  selector: 'question-component',
  templateUrl: 'templates/question'
})
export class QuestionComponent implements OnInit{
	question: Question;

	constructor(
		private questionService: QuestionService,
		private router: Router
	) {}
	
	getNextQuestion(): void {
		this.questionService
			.getNextQuestion()
			.then(question => {
				this.question = question
			});
	}
	
	ngOnInit(): void {
		this.getNextQuestion();
	}

}
