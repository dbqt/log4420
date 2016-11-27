import { Component, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';
import { Location } from '@angular/common';
import { StatsDetaillesComponent } from './stats-detailles.component';
//import { Component, Input } from '@angular/core';

import { Progres } from './progres';
import { ProgresService }			from './progres.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit{
	domaines = ["HTML", "CSS", "JavaScript"];
	nbQuestions = 1000;
	selectedDomaine = this.domaines[0];
	examenEnCours = false;
	
	nombreQuestionsReussies = 0;
	moyenneExamens = 0;
	countHTMLgood = 0;
	countHTMLwrong = 0;
	countJavaScriptgood = 0;
	countJavaScriptwrong = 0;
	countCSSgood = 0;
	countCSSwrong = 0;
	questionSucceedCount = 0;
	questionFailCount = 0;
	
	@ViewChild(StatsDetaillesComponent)
	public readonly modal: StatsDetaillesComponent;

	constructor(
		private progresService: ProgresService,
		private location: Location,
		private router: Router,
	){ }
	
	goTestRapide(): void {
		this.progresService
			.commencerTestRapide()
			.then((data) => {
				this.router.navigate(['/question']);
			});
	}
	
	goNewExamen(): void {
		
		//this.save_configs();
		
		if(this.examenEnCours)
		{
			// Give Up
			this.progresService
				.giveUp(null)
				.then(response1 => {
				
					this.progresService
						.handleResult(null)
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
		this.modal.show();
	}
	
	resetStats() {
		console.log("reset");
	}
	
	updateStats() {
    }
    
    checkExamenEnCours(): void {
		this.progresService
			.getCurrentProgres()
			.then((progres) => {
				console.log(progres.examenEnCours);
				this.examenEnCours = progres.examenEnCours;
			});    
    }
	
    ngOnInit(): void {
		this.checkExamenEnCours();
    }
}
 
