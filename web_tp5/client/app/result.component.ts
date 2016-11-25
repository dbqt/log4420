import { Component, OnInit } from '@angular/core';
//import { Component, Input } from '@angular/core';

@Component({
  selector: 'result-component',
  templateUrl: 'templates/result'
})
export class ResultComponent implements OnInit{

	


	//TODO
	ngOnInit(): void {
		var script = document.createElement('script');
		script.src = "/scripts/result_logic.js";
		document.getElementsByTagName('head')[0].appendChild(script);
  }
}
