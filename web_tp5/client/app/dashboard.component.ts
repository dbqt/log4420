import { Component, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';
import { Location } from '@angular/common';
import { StatsDetaillesComponent } from './stats-detailles.component';
//import { Component, Input } from '@angular/core';

import { ProgresService }			from './progres.service';

@Component({
  selector: 'dashboard-component',
  templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit{
	domaines = ["HTML", "CSS", "JavaScript"];
	nbQuestions = 1000;
	selectedDomaine = this.domaines[0];
	
	@ViewChild(StatsDetaillesComponent)
	public readonly modal: StatsDetaillesComponent;

	constructor(
		private progresService: ProgresService,
		private location: Location,
		private router: Router,
	){ }

	ngOnInit(): void {
    }
	
	goTestRapide(): void {
		this.progresService
			.commencerTestRapide()
			.then((data) => {
				console.log("CHANGE MY URL PLEASE, IT CURRENTLY FAILS");
				let link = ['/question'];
				this.router.navigate(link);
			});
	}
	
	goNewExamen(): void {
		
		//this.save_configs();
	
		this.progresService
			.commencerExamen({"choix_domaine": this.selectedDomaine, "choix_nombre": this.nbQuestions})
			.then((data) => {
				let link = ['/question'];
				this.router.navigate(link);
			});
	}
	
	goContinueExamen(): void {
		let link = ['/question'];
		this.router.navigate(link);
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
}
 
