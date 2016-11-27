import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Progres } from './progres';
import { ProgresService }			from './progres.service';

@Component({
  selector: 'result-component',
  templateUrl: 'templates/result'
})
export class ResultComponent implements OnInit{

	message: String;
	
	constructor(
		private progresService: ProgresService,
		private router: Router
	) {
		this.message = "";
	}

	handleResult(): void {
		this.progresService
			.handleResult()
			.then((data) => {
				this.message = data;
				this.deleteProgres();
			});
	
	}
	
	deleteProgres(): void {
		this.progresService
			.deleteProgres();
	}


	ngOnInit(): void {
		this.handleResult();
  }
}
