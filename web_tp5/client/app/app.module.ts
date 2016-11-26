import { NgModule  }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent }         from './app.component';

import { HomeComponent }  		from './home.component';
import { DashboardComponent }   from './dashboard.component';
import { InstructionsComponent } from './instructions.component';

import { QuestionComponent }    from './question.component';
import { ResultComponent }  	from './result.component';
import { StatsDetaillesComponent } from './stats-detailles.component';
import { AdminComponent } from './admin.component';

import { QuestionService }          from './question.service';
import { StatsService }          from './stats.service';
import { ProgresService } from './progres.service';

@NgModule({
  imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent,
		HomeComponent,
		DashboardComponent,
		InstructionsComponent,
		QuestionComponent,
		ResultComponent,
		StatsDetaillesComponent,
		AdminComponent
	],
  providers: [ ProgresService, QuestionService, StatsService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
