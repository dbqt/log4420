import { Component, OnInit } from '@angular/core';
//import { Component, Input } from '@angular/core';

@Component({
  selector: 'admin-component',
  templateUrl: 'templates/admin'
})
export class AdminComponent implements OnInit{
	//TODO
	ngOnInit(): void {
		var script = document.createElement('script');
		script.src = "/scripts/admin_logic.js";
		document.getElementsByTagName('head')[0].appendChild(script);
  }
}
