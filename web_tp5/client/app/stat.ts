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
	examen: Examen;
	testRapide: TestRapide;
}

export class ExamenDetaille {
	nom: string;
	domaine:string;
	score:number;
	nbQuestions:number;
	id:string;
}

export class Examen {
	echoue: {
		CSS: number;
		JavaScript: number;
		HTML: number;
	};
	reussi: {
		CSS: number;
		JavaScript: number;
		HTML: number;
	};
}

export class TestRapide {
	echoue: number;
	reussi: number;
}
