import { Component, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';
import { Location } from '@angular/common';
import { StatsDetaillesComponent } from './stats-detailles.component';
//import { Component, Input } from '@angular/core';

import { Progres } from './progres';
import { ProgresService }			from './progres.service';

import { Stat, ExamenDetaille } from './stat'
import { StatsService }			from './stats.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit{
	domaines = ["HTML", "CSS", "JavaScript"];
	selectedDomaine = this.domaines[0];
	nbQuestions = 1;
	examenEnCours = false;
	
	scoreTotal = 0;
	nbQuestionsTotal = 0;
	moyenneExamens = 0;
	countHTMLgood = 0;
	countHTMLwrong = 0;
	countJavaScriptgood = 0;
	countJavaScriptwrong = 0;
	countCSSgood = 0;
	countCSSwrong = 0;
	questionSucceedCount = 0;
	questionFailCount = 0;
	
	//nombreQuestionsMax = ["HTML": 0, "JavaScript": 0, "CSS": 0];
	nombreQuestionsMax = [0, 0, 0];
	
	fuckinglel = 0;
	
	@ViewChild(StatsDetaillesComponent)
	public modal: StatsDetaillesComponent;

	constructor(
		private progresService: ProgresService,
		private statsService: StatsService,
		private location: Location,
		private router: Router,
	){ this.updateStats(); }
	
	goTestRapide(): void {
		this.progresService
			.commencerTestRapide()
			.then((data) => {
				this.router.navigate(['/question']);
			});
	}
	
	goNewExamen(): void {		
		if(this.examenEnCours)
		{
			// Give Up
			this.progresService
				.giveUp()
				.then(response1 => {
				
					this.progresService
						.handleResult()
						.then(response2 => {
						
							this.progresService
								.deleteProgres()
								.then(response3 => {
								
									this.commencerExamen();
								})
						})
				});
		}
		else
		{
			this.commencerExamen();
		}
	}
	
	commencerExamen(): void {
		this.progresService
		.commencerExamen({"choix_domaine": this.selectedDomaine, "choix_nombre": this.nbQuestions})
		.then((data) => {
			this.router.navigate(['/question']);
		});
	}
	
	goContinueExamen(): void {
		this.progresService
			.continueExam()
			.then((data) => {
				this.router.navigate(['/question']);
			});
	}
	
	goAdmin(): void {
		let link = ['/admin'];
		this.router.navigate(link);
	}
		
    onSelect(value) {
        this.selectedDomaine = null;
        for (var i = 0; i < this.domaines.length; i++)
        {
          if (this.domaines[i] == value) {
            this.selectedDomaine = this.domaines[i];
          }
        }
    }
	
	save_configs() {	
	}
	
	// Stats
	showModalStats() {
		console.log("show stats");
		//this.updateStats();
		this.modal.show();
	}
	
	resetStats() {
		console.log("reset");
	}
	
	updateStats() {
		this.statsService.getStats().then((stats) => {
			// exams stats
			var scoreTotalTemp = 0;
            var nbQuestionsTotaltemp = 0;
			stats.examensDetailles.forEach(function(element) {
				scoreTotalTemp += element.score;
                nbQuestionsTotaltemp += element.nbQuestions;
			})
			var moyenne = ((nbQuestionsTotaltemp != 0) ? Math.floor((scoreTotalTemp / nbQuestionsTotaltemp) * 100) : 0);
			this.scoreTotal = scoreTotalTemp;
			this.nbQuestionsTotal = nbQuestionsTotaltemp;
			this.moyenneExamens = moyenne;

			// simple stats
			this.countHTMLgood = stats.examen.reussi.HTML;
			this.countHTMLwrong = stats.examen.echoue.HTML;
			this.countJavaScriptgood = stats.examen.reussi.JavaScript;
			this.countJavaScriptwrong = stats.examen.echoue.JavaScript;
			this.countCSSgood = stats.examen.reussi.CSS;
			this.countCSSwrong = stats.examen.echoue.CSS;
			this.questionSucceedCount = stats.testRapide.reussi;
			this.questionFailCount = stats.testRapide.echoue;

			this.modal.stat = stats.examensDetailles;
		});
		
    }
    
    checkExamenEnCours(): void {
		this.progresService
			.getCurrentProgres()
			.then((progres) => {
				this.examenEnCours = progres.examenEnCours;
			});    
    }
    
    checkNbQuestionsMax( ): void {
    		this.progresService
			.getNbQuestionsMax()
			.then((monArray) => {
				this.nombreQuestionsMax = monArray;
			});  
    }
    
    getNbQuestionsMaxComputed(): number {
		switch(this.selectedDomaine)
		{
			case "HTML":
				return this.nombreQuestionsMax[0];
			case "JavaScript":
				return this.nombreQuestionsMax[1];
			case "CSS":
				return this.nombreQuestionsMax[2];
			default:
				return 0;
		}
				
    }
	
    ngOnInit(): void {
		this.checkExamenEnCours();
		this.checkNbQuestionsMax();
    }
}
 
