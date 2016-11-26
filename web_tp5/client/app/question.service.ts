import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {

	private headers = new Headers({'Content-Type': 'application/json'});
	constructor(private http: Http) { }
  
	getNextQuestion(): Promise<Question> {
		console.log("HERE WE GO");
		
		
		return this.http.get('api/next')
			.toPromise()
			.then(response => {
				//console.log(response.json());
				console.log(response.json() as Question);
				
				var maq = new Question();
				
				maq.domaine = response.json().domaine;
				maq.question = response.json().question;
				maq.reponse1 = response.json().reponse1;
				maq.reponse2 = response.json().reponse2;
				maq.reponse3 = response.json().reponse3;
				
				return maq;
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
