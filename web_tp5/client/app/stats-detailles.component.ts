import { Component, Input } from '@angular/core';

export class Stats {
	examen: string;
	score: number;
}

const STATISTICS: Stats[] = [
  { examen: "Examen1000", score: 99999},
  { examen: "Examen2", score: 1}
];

@Component({
  selector: 'mes-stats-detailles',
  template: `
  <div *ngFor="let stat of stats">
    <h2>Stats detailles de {{stat.examen}}</h2>
    <div><label>score: </label>{{stat.score}}</div>
  </div>
`
})
export class StatsDetaillesComponent {
  stats = STATISTICS;
}
