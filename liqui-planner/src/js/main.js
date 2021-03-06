"use strict";

let haushaltsbuch = {
	
	gesamtbilanz : new Map(),

	eintraege : [],

	gesamtbilanz_erstellen() {
		let neue_gesamtbilanz = new Map();
		neue_gesamtbilanz.set('einnahmen', 0);
		neue_gesamtbilanz.set('ausgaben', 0);
		neue_gesamtbilanz.set('bilanz', 0);

		this.eintraege.forEach(function(i){
			
			// console.log(i);

			if ( ['Einnahme', 'E', 'e'].includes( i.get('typ') ) ) {
        		neue_gesamtbilanz.set('einnahmen', ( neue_gesamtbilanz.get('einnahmen') + parseInt(i.get('betrag')) ));
        		neue_gesamtbilanz.set('bilanz', (neue_gesamtbilanz.get('bilanz') + parseInt(i.get('betrag')) ));
    		} else {
        		neue_gesamtbilanz.set('ausgaben', (neue_gesamtbilanz.get('ausgaben') + parseInt(i.get('betrag')) ));
        		neue_gesamtbilanz.set('bilanz', (neue_gesamtbilanz.get('bilanz') - parseInt(i.get('betrag')) ));
    		}
		});

		this.gesamtbilanz = neue_gesamtbilanz;

	},

	eintrage_sortieren() {
		let sortierte_eintraege = this.eintraege.sort( function(a,b) {
			if ( a.get('datum') < b.get('datum') ) {
				return 1;
			} 
			else if ( a.get('datum') > b.get('datum') ) {
				return -1;
			} 
			else {
				return 0;
			} 
		});

		this.eintraege = sortierte_eintraege;
	},

	eintrag_erfassen() {
		let neuer_eintrag = new Map();
		neuer_eintrag.set('titel', prompt("Titel"));
		neuer_eintrag.set('typ', prompt("Typ: Einnahme/Ausgabe"));
		neuer_eintrag.set('betrag', prompt("Betrag"));		
		neuer_eintrag.set('datum', new Date(prompt("Datum", "JAHR-MM-TT")));
		neuer_eintrag.set('timestamp', Date.now() );

		this.eintraege.push(neuer_eintrag);
		this.eintrage_sortieren();
	},

	gesamtbilanz_ausgeben(){
		console.log(`Einnahmen: ${this.gesamtbilanz.get('einnahmen')} \n`
			+ `Ausgaben: ${this.gesamtbilanz.get('ausgaben')} \n` 
			+ `Bilanz: ${this.gesamtbilanz.get('bilanz')} \n` 
			+ `Bilanz ist positiv: ${this.gesamtbilanz.get('bilanz') >= 0}`
			)
	},

	eintrag_hinzufuegen(){
		let weiterer_eintrag = true;
		while(weiterer_eintrag){
			this.eintrag_erfassen();
			this.eintraege_ausgeben();
			this.gesamtbilanz_erstellen();		
			this.gesamtbilanz_ausgeben();
			weiterer_eintrag = confirm("Weiteren Eintrag hinzuf??gen?");		
		}
	},

	eintraege_ausgeben(){
		console.clear();
		this.eintraege.forEach( function(e) {
			let ki = ['betrag', 'datum', 'titel', 'typ', 'timestamp']; 
			ki.forEach( function(k) {
				if ( k === 'datum') {
					console.log( `${k}: ${ e.get(k).toLocaleDateString("de-DE", { 
						year: 'numeric', month: '2-digit', day: '2-digit'}) }` );
				} else {
					console.log( `${k}: ${e.get(k)}` );
				} 
			})
		});
	}		

};

haushaltsbuch.eintrag_hinzufuegen();
