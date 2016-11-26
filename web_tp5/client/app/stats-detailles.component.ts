import { Component, Input } from '@angular/core';

import { Stat } from './stat'
import { StatsService }			from './stats.service';

const STATISTICS: Stat[] = [];

@Component({
  selector: 'mes-stats-detailles',
  templateUrl: 'templates/stats-detailles'
})
export class StatsDetaillesComponent {
  stats = STATISTICS;
  
  constructor(
		private statsService: StatsService,
	) {}
	
	  
  public visible = false;
  private visibleAnimate = false;

  public show(): void {
  console.log("showing");
  console.log(this.statsService.getStats());
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}
