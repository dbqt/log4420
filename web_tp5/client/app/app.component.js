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
var Question = (function () {
    function Question() {
    }
    return Question;
}());
exports.Question = Question;
var AppComponent = (function () {
    function AppComponent() {
        this.title = "Tour of heroes";
        this.value = "Tests";
        this.question = {
            domaine: "HTML",
            question: "?",
            reponse1: "un",
            reponse2: "d",
            reponse3: "t",
            answer: "reponse1"
        };
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'mon-app',
            template: "\n    <h1>{{title}}</h1>\n    <p>{{value}}</p>\n    <h2>{{question.domaine}}</h2>\n    <h3>{{question.question}}</h3>\n    <p>{{question.reponse1}}</p>\n\t<p>{{question.reponse2}}</p>\n\t<p>{{question.reponse3}}</p>\n\t<p>{{question.answer}}</p>\n\t"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map