export class Stat {
	_id: string;
	mode: string;
	progres: {
		numeroQuestionEnCours:number;
		scoreEnCours:number;
		examenEnCours:boolean;
		scoreTestRapide:number;
		numeroQuestionTestRapide:number;
	};
	examensDetailles: Array<ExamenDetaille>;
	examen: Object;
	testRapide:Object;
}

export class ExamenDetaille {
	nom: string;
	domaine:string;
	score:number;
	nbQuestions:number;
	id:string;
}
