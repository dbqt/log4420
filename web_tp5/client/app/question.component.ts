import { Component, OnInit }		from '@angular/core';
import { Router }            from '@angular/router';

import { Question }					from './question';
import { QuestionService }			from './question.service';
import { Progres }					from './progres';
import { ProgresService }			from './progres.service';


@Component({
  selector: 'question-component',
  templateUrl: 'templates/question'
})
export class QuestionComponent implements OnInit{

	mode: String;
	question: Question;
	progres: Progres
	questionId: String;

	constructor(
		private questionService: QuestionService,
		private progresService: ProgresService,
		private router: Router
	) {
		this.mode == "";
		this.question = new Question();
		this.progres = new Progres();
		this.questionId = "";
	}
	
	initialize() : void {
		this.progresService
			.getMode()
			.then(mode => {
				this.mode = mode;
				this.getCurrentProgres(true);
			});
	}
	
	getCurrentProgres(wantNextQuestion): void {
		this.progresService
			.getCurrentProgres()
			.then(progres => {
				this.progres = progres;
				if(wantNextQuestion){ this.getNextQuestion(); }
			});
	}
	
	getNextQuestion(): void {
	
		if (this.mode == "testrapide")
		{
			this.questionService
				.getNextQuestion()
				.then(question => {
					this.question = question;
					this.getCurrentProgres(false);
				});
		}
		else if (this.mode == "examen")
		{
			if(this.progres.numeroQuestionEnCours > this.progres.nbQuestionsEnCours)
			{
				this.router.navigate(['/result']);
			}
			else
			{
				this.questionService
					.getNextQuestion()
					.then(question => {
						this.question = question;
						this.getCurrentProgres(false);
					});	
			}
		}
	}
	
	giveUp(): void {
		if(this.mode == "testrapide")
		{
			this.router.navigate(['/dashboard']);
		}
		else
		{
			this.progresService
				.giveUp(null)
				.then(progres => {
					this.router.navigate(['/dashboard']);
				});
		}
	}
	
	ngOnInit(): void {
		this.initialize();
	}

}
