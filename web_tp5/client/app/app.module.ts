import { NgModule  }      from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule  }   from '@angular/forms';

import { AppComponent } from './app.component';
import { StatsDetaillesComponent } from './stats-detailles.component';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, StatsDetaillesComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
