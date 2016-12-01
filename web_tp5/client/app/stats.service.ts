import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Stat } from './stat';

@Injectable()
export class StatsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private statsUrl = 'api/stats';  // URL to web api

  constructor(private http: Http) { }
  
  	getStats(): Promise<Stat> {
		return this.http.get(this.statsUrl)
			.toPromise()
			.then(response => {return response.json() as Stat})
			//.catch(this.handleError);
	}
	
	deleteStats(): Promise<any> {
		return this.http.delete(this.statsUrl).toPromise();
	}

	

}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
