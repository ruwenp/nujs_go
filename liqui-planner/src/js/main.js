"use strict";

let hhb = {
	einnahmen: 0,
	ausgaben: 0,
	bilanz: 0,
	new_in: {
		titel: "",
		typ: "Ausgabe",
		betrag: 0,
		datum: ""
	},
	
	calculus(){
    		if ( ['Einnahme', 'E', 'e'].includes( this.new_in.type ) ) {
        		this.einnahmen += parseInt(this.new_in.betrag);
        		this.bilanz += parseInt(this.new_in.betrag);
    		} else {
        		this.ausgaben += parseInt(this.new_in.betrag);
        		this.bilanz -= parseInt(this.new_in.betrag);
    		}
	},

	workflow(){
  		this.my_prompt();
		console.log( this.my_output() );
		this.calculus();
	},

	my_prompt() {
    		this.new_in.titel = prompt("Titel");
    		this.new_in.type = prompt("Type: Einnahme/Ausgabe");
    		this.new_in.betrag = prompt("Betrag");
    		this.new_in.datum = prompt("Datum", "JAHR-MM-TT");
		this.calculus();
	},
	
	my_output(){
		return `
		titel: ${this.new_in.titel} 
        	type: ${this.new_in.type} 
        	betrag: ${this.new_in.betrag} 
        	datum: ${this.new_in.datum}`;
	}
};

while (true) { 
	hhb.workflow();
      	let mehr_input_frage = prompt("Noch eine Angabe? j/n");
    	if ( mehr_input_frage !== 'j' ) {
        	break;
    	}
}

console.log( `Einnahmen: ${hhb.einnahmen} - Ausgaben: ${hhb.ausgaben} = ${hhb.bilanz}`);
