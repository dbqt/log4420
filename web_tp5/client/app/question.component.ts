import { Component, OnInit } from '@angular/core';
//import { Component, Input } from '@angular/core';

import { Question }                from './question';

@Component({
  selector: 'question-component',
  templateUrl: 'templates/question'
})
export class QuestionComponent implements OnInit{
	//TODO
	ngOnInit(): void {
		var script = document.createElement('script');
		script.src = "/scripts/question_logic.js";
		document.getElementsByTagName('head')[0].appendChild(script);
  }
}
