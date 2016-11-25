import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Location } from '@angular/common';
//import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-component',
  templateUrl: 'templates/dashboard'
})

export class DashboardComponent implements OnInit{

	domaines : Array<Object>
	nbQuestions: number

	constructor(
		private location: Location,
		private router: Router,
	){
		this.domaines = [
			{ value: 'HTML', display: 'HTML' },
			{ value: 'CSS', display: 'CSS' },
			{ value: 'JavaScript', display: 'JavaScript' }
		];
		this.nbQuestions = 1;
	}

	//TODO
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
	
	onDomaineSelect(value): void {
		console.log("on a choisi : " + value);
	}
	
	save_configs() {
		
	}
}
 
