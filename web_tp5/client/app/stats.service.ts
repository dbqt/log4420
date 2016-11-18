import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Stat } from './stat';

@Injectable()
export class StatsService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private statsUrl = 'app/stats';  // URL to web api

  constructor(private http: Http) { }

}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
