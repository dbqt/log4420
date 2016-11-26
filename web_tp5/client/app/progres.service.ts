import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

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
