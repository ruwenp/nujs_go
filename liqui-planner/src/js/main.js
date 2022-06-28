"use strict";

let haushaltsbuch = {
	
	gesamtbilanz : {
		einnahmen: 0,
		ausgaben: 0,
		bilanz: 0
	},

	eintraege : [],

	calculus() {
		this.eintraege.forEach(function(i){
			if ( ['Einnahme', 'E', 'e'].includes( i.type ) ) {
        			this.gesamtbilanz.einnahmen += parseInt(i.betrag);
        			this.gesamtbilanzbilanz += parseInt(i.betrag);
    			} else {
        			this.gesamzbilanz.ausgaben += parseInt(i.betrag);
        			this.gesamtbilanz.bilanz -= parseInt(i.betrag);
    			}
		});
	},

	eintrag_erfassen() {
		this.eintraege.push({
			titel: prompt("Titel"),
			type: prompt("Type: Einnahme/Ausgabe"),
			betrag: prompt("Betrag"),
			datum: prompt("Datum", "JAHR-MM-TT")
		});
	},
	
	eintraege_ausgeben(){
		this.eintraege.forEach( function(e) {
			let ki = this.eintraege[e].keys();
			ki.forEach( function(k) {
				console.log( `${k}: ${this.eintraege[e][k]}` ); 
			})
		})
	},

	eintrag_hinzufuegen(){
		this.eintrag_erfassen();
		this.eintraege_ausgeben();
	}
};

while (true) { 
	haushaltsbuch.eintrag_hinzufuegen();
      	let mehr_input_frage = prompt("Noch eine Angabe? j/n");
    	if ( mehr_input_frage !== 'j' ) {
        	break;
    	}
}

haushaltsbuch.calculus();
haushaltsbuch.eintraege_ausgeben();

// console.log( `Einnahmen: ${haushaltsbuch.einnahmen} - Ausgaben: ${haushaltsbuch.ausgaben} = ${haushaltsbuch.bilanz}`);
