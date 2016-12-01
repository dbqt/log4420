import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question';

@Injectable()
export class QuestionService {

	private headers = new Headers({'Content-Type': 'application/json'});
	constructor(private http: Http) { }
  
	getQuestion(): Promise<Question> {
		return this.http.get('api/next')
			.toPromise()
			.then(response => {				
				var maq = new Question();	
				maq.id = response.json()._id;
				maq.domaine = response.json().domaine;
				maq.question = response.json().question;
				maq.reponse1 = response.json().reponse1;
				maq.reponse2 = response.json().reponse2;
				maq.reponse3 = response.json().reponse3;
				return maq;
			})
			.catch(this.handleError);
	}
	
	verifyAnswer(monQuestionId): Promise<String> {
		return this.http.post('api/verifyAnswer', monQuestionId)
			.toPromise()
			.then(response => {				
				return response.json();
			})
			.catch(this.handleError);
	
	}
	
	addQuestion(body) : Promise<any>  {
		return this.http.post('api/question', body).toPromise().then(response => {
			if(response.ok) {
				alert("Question ajoutée avec succès!");
			} else {
				alert("Erreur: Question pas ajoutée");
			}
		}).catch(this.handleError);
	}
	
	deleteQuestions(): Promise<any> {
		return this.http.delete('api/question').toPromise();
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
