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
	choixText: String;
	reponseText: String;

	idChoix: String;
	
	classChoixDisabled: boolean = false;;
	classReponseStatus: number = -1; // -1 = unanswered, 0 = wrong, 1 = right
	classReponseOver: boolean = false;
	classSuivantDisabled: boolean = false;
	
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
				console.log(this.mode);
				this.getCurrentProgres(true);
			});
	}
	
	getCurrentProgres(wantNextQuestion): void {
		this.progresService
			.getCurrentProgres()
			.then(progres => {
				this.progres = progres;
				console.log(this.progres);
				if(wantNextQuestion){ this.getQuestion(); }
			});
	}
	
	getQuestion(): void {
	
		if (this.mode == "testrapide")
		{
			this.questionService
				.getQuestion()
				.then(question => {
					this.question = question;
					console.log(this.question);
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
					.getQuestion()
					.then(question => {
						this.question = question;
						console.log(this.question);
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
		else if (this.mode == "examen")
		{
			this.progresService
				.giveUp()
				.then(progres => {
					this.router.navigate(['/result']);
				});
		}
	}
	
	ngOnInit(): void {
		this.initialize();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	handleDragStart(e) : void {	
		e.dataTransfer.effectAllowed = "move";
		
		this.choixText = e.target.innerHTML;
		this.idChoix = e.target.id
	}

	handleDragEnter(e) : void {
		this.classReponseOver = true;
	}

	handleDragOver(e) : boolean {
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		
				console.log("haha!");


		// On détermine le type de drag-and-drop ici.
		e.dataTransfer.dropEffect = "move";

		return false;
	}

	handleDragLeave(e) : void {
		this.classReponseOver = false;
	}

	handleDrop(e) : boolean {
		if (e.stopPropagation) {
			e.stopPropagation(); // Stops some browsers from redirecting.
		}

		if (this.classReponseStatus == -1) {
			this.reponseText = this.choixText;

			var dataToSend = {questionId: this.question.id, reponseChoisie: this.idChoix};

			this.questionService
				.verifyAnswer(dataToSend)
				.then(response => {
					this.classReponseStatus = response;
					this.classChoixDisabled = true;
					this.classSuivantDisabled = true;
					this.getCurrentProgres(false);
				});	
		}

		return false;
	}

	handleDragEnd(e) : void {
		this.classReponseOver = false;
	}
}
