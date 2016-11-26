import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Progres } from './progres';

@Injectable()
export class ProgresService {
	private headers = new Headers({'Content-Type': 'application/json'});
	constructor(private http: Http) { }
	
  
	commencerTestRapide(): Promise<void> {
		return this.http.post('api/stats/progres/testrapide', null)
			.toPromise()
			.then(response => console.log(response))
			.catch(this.handleError);
	}
	
	commencerExamen(mesParametres): Promise<void> {
		return this.http.post('api/stats/progres/examen', mesParametres)
			.toPromise()
			.then(response => console.log(response))
			.catch(this.handleError);
	}
	
	giveUp(mesParametres): Promise<void> {
		return this.http.post('/api/giveUp', mesParametres)
			.toPromise()
			.then(response => {
				console.log(response);
			})
			.catch(this.handleError);
	}
	
	getMode(): Promise<String> {
		return this.http.get('api/getMode')
			.toPromise()
			.then(mode => {
				return mode.json();
			})
			.catch(this.handleError);
	}
	
	getCurrentProgres(): Promise<Progres> {
		return this.http.get('api/stats/progres')
			.toPromise()
			.then(response => {				
				var monp = new Progres();	
				monp.numeroQuestionEnCours = response.json().numeroQuestionEnCours;
				monp.nbQuestionsEnCours = response.json().nbQuestionsEnCours;
				monp.scoreEnCours = response.json().scoreEnCours;
				return monp;
			})
			.catch(this.handleError);
	}










	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
