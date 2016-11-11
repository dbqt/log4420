"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Stats = (function () {
    function Stats() {
    }
    return Stats;
}());
exports.Stats = Stats;
var STATISTICS = [
    { examen: "Examen1000", score: 99999 },
    { examen: "Examen2", score: 1 }
];
var StatsDetaillesComponent = (function () {
    function StatsDetaillesComponent() {
        this.stats = STATISTICS;
    }
    StatsDetaillesComponent = __decorate([
        core_1.Component({
            selector: 'mes-stats-detailles',
            template: "\n  <div *ngFor=\"let stat of stats\">\n    <h2>Stats detailles de {{stat.examen}}</h2>\n    <div><label>score: </label>{{stat.score}}</div>\n  </div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], StatsDetaillesComponent);
    return StatsDetaillesComponent;
}());
exports.StatsDetaillesComponent = StatsDetaillesComponent;
//# sourceMappingURL=stats-detailles.component.js.map