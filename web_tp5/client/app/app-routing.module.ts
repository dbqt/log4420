import { NgModule  }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }  		from './home.component';
import { DashboardComponent }   from './dashboard.component';
import { InstructionsComponent } from './instructions.component';

import { QuestionComponent }    from './question.component';
import { ResultComponent }  	from './result.component';
import { StatsDetaillesComponent } from './stats-detailles.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'instructions',     component: InstructionsComponent },
  { path: 'question',     component: QuestionComponent },
  { path: 'result',     component: ResultComponent },
  { path: 'admin',     component: AdminComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
