import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Router }            from '@angular/router';
import { Location } from '@angular/common';
//import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-component',
  templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit{
	domaines = ["HTML", "CSS", "JavaScript"];
	nbQuestions = 1000;
	selectedDomaine = this.domaines[0];

	constructor(
		private location: Location,
		private router: Router,
	){ }

	ngOnInit(): void {
    }
    
    goTestRapide(): void {
		let link = ['/question'];
		this.router.navigate(link);
	}
	
	goNewExamen(): void {
		
		this.save_configs();
	
		let link = ['/question'];
		this.router.navigate(link);
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
}
 
