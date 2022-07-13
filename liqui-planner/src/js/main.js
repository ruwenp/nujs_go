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
			
			// console.log(i);

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

	eintrage_sortieren() {
		let sortierte_eintraege = this.eintraege.sort( function(a,b) {
			if ( a.datum < b.datum ) {
				return 1;
			} 
			else if ( a.datum > b.datum ) {
				return -1;
			} 
			else {
				return 0;
			} 
		});

		this.eintraege = sortierte_eintraege;
	},

	eintrag_erfassen() {
		this.eintraege.push({
			titel: prompt("Titel"),
			type: prompt("Type: Einnahme/Ausgabe"),
			betrag: prompt("Betrag"),
			datum: prompt("Datum", "JAHR-MM-TT")
		});

		this.eintrage_sortieren();
	},

	gesamtbilanz_ausgeben(){
		console.log(`Einnahmen: ${this.gesamtbilanz.einnahmen} \n`
			+ `Ausgaben: ${this.gesamtbilanz.ausgaben} \n` 
			+ `Bilanz: ${this.gesamtbilanz.bilanz} \n` 
			+ `Bilanz ist positiv: ${this.gesamtbilanz.bilanz >= 0}`
			)
	},

	eintrag_hinzufuegen(){
		let weiterer_eintrag = true;
		while(weiterer_eintrag){
			this.eintrag_erfassen();
			this.eintraege_ausgeben();
			this.gesamtbilanz_erstellen();		
			this.gesamtbilanz_ausgeben();
			weiterer_eintrag = confirm("Weiteren Eintrag hinzufügen?");		
		}
	},

	eintraege_ausgeben(){
		console.clear();
		this.eintraege.forEach( function(e) {
			let ki = ['betrag', 'datum', 'titel', 'type']; 
			ki.forEach( function(k) {
				console.log( `${k}: ${e[k]}` ); 
			})
		});
	}		

};

haushaltsbuch.eintrag_hinzufuegen();
