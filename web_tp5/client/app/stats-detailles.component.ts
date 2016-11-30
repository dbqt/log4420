import { Component, Input } from '@angular/core';

import { Stat, ExamenDetaille } from './stat'
import { StatsService }			from './stats.service';

@Component({
  selector: 'mes-stats-detailles',
  templateUrl: 'templates/stats-detailles'
})
export class StatsDetaillesComponent {
  public stat: ExamenDetaille[];
  
  constructor(
		private statsService: StatsService,
	) {
      this.hide();
      
  }
	
	  
  private isHidden = true;
  private visibleAnimate = false;

  public show(): void {
  console.log("showing");
  //this.statsService.getStats();
    this.isHidden = false;
    //setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.isHidden = true;
    //this.visibleAnimate = false;
    //setTimeout(() => this.visible = false, 300);
  }

  public getVisibility() {
      return this.isHidden ? "modalInVisible" : "modalVisible";
  }
}
