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
	progres: Progres;
	questionId: String;
	
	//idChoix: String;
	//choixText: String;
	reponseText: String = "";

	
	classChoixEnabled: boolean = true;
	classReponseStatus: number = -1; // -1 = unanswered, 0 = wrong, 1 = right
	classReponseOver: boolean = false;
	classSuivantEnabled: boolean = false;
	
	getClassReponseTrue(): boolean {
		console.log("Should it be green? :" + this.classReponseStatus);
		return (this.classReponseStatus == 1);
	}
	
	classReponseTrue: boolean = false;
	classReponseFalse: boolean = false;
		
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
					
					this.reponseText = "";
					this.classChoixEnabled = true;
					this.classSuivantEnabled = false;
					this.classReponseStatus = -1;
					this.classReponseTrue = false;
					this.classReponseFalse = false;
					
					//console.log(this.question);
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
						
						this.reponseText = "";
						this.classChoixEnabled = true;
						this.classSuivantEnabled = false;
						this.classReponseStatus = -1;
						this.classReponseTrue = false;
						this.classReponseFalse = false;
						
						//console.log(this.question);
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
	
	
	
	
	
	// NOUVELLE VERSION POUR TP5: APPELÉ AVEC CLICK
	
	chooseAnswer(e) : void {
		if (this.classReponseStatus == -1) {
					
			switch(e.target.id)
			{
				case "reponse1":
					this.reponseText = this.question.reponse1;
					break;
				case "reponse2":
					this.reponseText = this.question.reponse2;
					break;
				case "reponse3":
					this.reponseText = this.question.reponse3;
					break;
				default:
					this.reponseText = "Erreur";
					break;
			}
			
			var dataToSend = {questionId: this.question.id, reponseChoisie: e.target.id};

			this.questionService
				.verifyAnswer(dataToSend)
				.then(response => {
					this.classReponseStatus = response;
					this.classChoixEnabled = false;
					this.classSuivantEnabled = true;
					
					if (response == 1){	this.classReponseTrue = true; }
					else { this.classReponseFalse = true; }
					
					this.getCurrentProgres(false);
				});	
		}
		
	}
	
	
	
	
	
	// NON-ÉVALUÉ
/**	
	// Choix de reponse
	handleDragStart(e) : void {	
		console.log("1111111111 DRAG START");
		e.dataTransfer.effectAllowed = "move";
		
		this.choixText = e.target.innerHTML;
		this.idChoix = e.target.id;
	}

	// Zone de reponse
	handleDragEnter() : void {
		console.log("222222222-1 DRAG ENTER");
		this.classReponseOver = true;
	}
	
	// Zone de reponse
	handleDragEnter(e) : void {
		console.log("222222222-2 DRAG ENTER");
		this.classReponseOver = true;
	}

	// Zone de reponse
	handleDragOver(e) : boolean {
		console.log("3333333333 DRAG OVER");
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}

		// On détermine le type de drag-and-drop ici.
		e.dataTransfer.dropEffect = "move";

		return false;
	}

	// Zone de reponse
	handleDragLeave() : void {
		console.log("4444444444-1 DRAG LEAVE");
		this.classReponseOver = false;
	}

	// Zone de reponse
	handleDragLeave(e) : void {
		console.log("4444444444-2 DRAG LEAVE");
		this.classReponseOver = false;
	}

	// Zone de reponse
	handleDrop(e) : boolean {
		console.log("5555555555 DROP");
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
					this.classChoixEnabled = false;
					this.classSuivantEnabled = true;
					
					if (response == 1){	this.classReponseTrue = true; }
					else { this.classReponseFalse = true; }
					
					this.getCurrentProgres(false);
				});	
		}

		return false;
	}

	// Zone de reponse
	handleDragEnd() : void {
		console.log("6666666666-1 DRAG END");
		this.classReponseOver = false;
	}

	// Zone de reponse
	handleDragEnd(e) : void {
		console.log("6666666666-2 DRAG END");
		this.classReponseOver = false;
	}
*/
}
