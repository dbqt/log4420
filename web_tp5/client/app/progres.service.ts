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
			.catch(this.handleError);
	}
	
	commencerExamen(mesParametres): Promise<void> {
		return this.http.post('api/stats/progres/examen', mesParametres)
			.toPromise()
			.catch(this.handleError);
	}
	
	continueExam(): Promise<void> {
		return this.http.post('api/continueExam')
			.toPromise()
			.catch(this.handleError);
    });
	
	getCurrentProgres(): Promise<Progres> {
		return this.http.get('api/stats/progres')
			.toPromise()
			.then(response => {
				var monp = new Progres();
				
				monp.scoreTestRapide = response.json().scoreTestRapide;
				monp.numeroQuestionTestRapide = response.json().numeroQuestionTestRapide;
				
				monp.examenEnCours = response.json().examenEnCours;
				
				monp.scoreEnCours = response.json().scoreEnCours;
				monp.numeroQuestionEnCours = response.json().numeroQuestionEnCours;
				monp.nbQuestionsEnCours = response.json().nbQuestionsEnCours;
				
				return monp;
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
	
	handleResult(mesParametres): Promise<void> {
	         return this.http.post('/api/handleResult', mesParametres)
				.toPromise()
				.then(resultat => {
					return resultat.json();
				})
				.catch(this.handleError);
	}
	
	giveUp(mesParametres): Promise<void> {
		return this.http.post('/api/giveUp', mesParametres)
			.toPromise()
			.catch(this.handleError);
	}
	
	deleteProgres(): Promise<void> {
		return this.http.delete('/api/stats/progres')
			.toPromise()
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
