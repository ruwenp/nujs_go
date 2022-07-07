"use strict";

let haushaltsbuch = {
	
	gesamtbilanz : {
		einnahmen: 0,
		ausgaben: 0,
		bilanz: 0
	},

	eintraege : [],

	gesamtbilanz_erstellen() {
		let neue_gesamtbilanz = { einnahmen : 0, ausgaben : 0, bilanz : 0 };

		this.eintraege.forEach(function(i){
			
			console.log(i);

			if ( ['Einnahme', 'E', 'e'].includes( i.type ) ) {
        		neue_gesamtbilanz.einnahmen += parseInt(i.betrag);
        		neue_gesamtbilanz.bilanz += parseInt(i.betrag);
    		} else {
        		neue_gesamtbilanz.ausgaben += parseInt(i.betrag);
        		neue_gesamtbilanz.bilanz -= parseInt(i.betrag);
    		}
		});

		this.gesamtbilanz = neue_gesamtbilanz;

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
		console.clear;
		this.eintraege.forEach( function(e) {
			let ki = ['betrag', 'datum', 'titel', 'type']; 
			ki.forEach( function(k) {
				console.log( `${k}: ${e[k]}` ); 
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

haushaltsbuch.gesamtbilanz_erstellen();
haushaltsbuch.eintraege_ausgeben();

console.log(haushaltsbuch.gesamtbilanz);

// console.log( `Einnahmen: ${haushaltsbuch.einnahmen} - Ausgaben: ${haushaltsbuch.ausgaben} = ${haushaltsbuch.bilanz}`);
