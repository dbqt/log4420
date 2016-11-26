import { Component, Input } from '@angular/core';

import { Stat } from './stat'

const STATISTICS: Stat[] = [
  { examen: "Examen1000", score: 99999},
  { examen: "Examen2", score: 1}
];

@Component({
  selector: 'mes-stats-detailles',
  templateUrl: 'templates/stats-detailles'
})
export class StatsDetaillesComponent {
  stats = STATISTICS;
  
  public visible = false;
  private visibleAnimate = false;

  public show(): void {
  console.log("showing");
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}
