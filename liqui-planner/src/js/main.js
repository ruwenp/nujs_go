"use strict";

let haushaltsbuch = {
	
	gesamtbilanz : new Map(),

	eintraege : [],

	fehler: [],

	gesamtbilanz_erstellen() {
		let neue_gesamtbilanz = new Map();
		neue_gesamtbilanz.set('einnahmen', 0);
		neue_gesamtbilanz.set('ausgaben', 0);
		neue_gesamtbilanz.set('bilanz', 0);

		this.eintraege.forEach(function(i){
			
			// console.log(i);

			if ( i.get('typ') === 'Einnahme' ) {
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
		neuer_eintrag.set('titel', this.titel_verarbeiten(prompt("Titel")));
		neuer_eintrag.set('typ', this.typ_verarbeiten(prompt("Typ: Einnahme/Ausgabe")));
		neuer_eintrag.set('betrag', this.betrag_verarbeiten(prompt("Betrag in Euro")));		
		neuer_eintrag.set('datum', this.datum_verarbeiten(prompt("Datum", "JAHR-MM-TT")));
		neuer_eintrag.set('timestamp', Date.now() );

		console.clear();

		if ( this.fehler.length > 0 ) {
			console.log(this.fehler);			
			this.fehler = this.fehler.filter( ( el ) => true );
		} else {
			this.eintraege.push(neuer_eintrag);
			this.eintrage_sortieren();
		}

	},

	typ_verarbeiten(typ_raw){
		typ_raw = typ_raw.trim().toLowerCase();

		if ( typ_raw.length > 0 ) {
			if ( ['einnahme', 'ein', 'e'].includes( typ_raw )) { 
				return 'Einnahme';
			} else {
				return 'Ausgabe';
			}
		} else {
			this.fehler.push('Bitte einen Typ defineiren');
		}
	},

	titel_verarbeiten(titel_raw){
		titel_raw = titel_raw.trim();
		if ( titel_raw.length > 0 ) {
			return titel_raw;
		} else {
			this.fehler.push('Leerer Titel ist ungültig');
		}
	},

	datum_verarbeiten(datum_raw){
		datum_raw = datum_raw.trim();
		if ( this.datum_validieren(datum_raw) === true ) {
			let datum = new Date(`${datum_raw} 00:00:00`);
			return datum;
		} else {
			this.fehler.push(`Ungültige Datums-Eingabe: ${datum_raw}`);
		}
	},

	datum_validieren(datum_raw){
		if (  datum_raw.match(/^\d{4}(\-|\.)\d{2}(\-|\.)\d{2}$/) !== null ) {
			return true;
		} else {
			return false;
		}
	},

	betrag_verarbeiten(betrag_raw){
		betrag_raw = betrag_raw.trim();
		if ( this.betrag_validieren(betrag_raw) === true ) { 
			let betrag = parseInt( parseFloat( betrag_raw.replace(',', '.') ) * 100 );
			return betrag;
		} else {
			this.fehler.push(`Ungültige Euro-Eingabe: ${betrag_raw}`);
		}
	},

	betrag_validieren(betrag_raw){
		if (  betrag_raw.match(/^\d+[\.\,]{0,1}\d+$/) !== null ) {
			return true;
		} else {
			return false;
		}
	},

	gesamtbilanz_ausgeben(){
		console.log(`Einnahmen: ${(this.gesamtbilanz.get('einnahmen') / 100).toFixed(2)} \n`
			+ `Ausgaben: ${(this.gesamtbilanz.get('ausgaben') / 100).toFixed(2)} \n` 
			+ `Bilanz: ${(this.gesamtbilanz.get('bilanz') / 100).toFixed(2)} \n` 
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
			weiterer_eintrag = confirm("Weiteren Eintrag hinzufügen?");		
		}
	},

	eintraege_ausgeben(){
		this.eintraege.forEach( function(e) {
			let ki = ['betrag', 'datum', 'titel', 'typ', 'timestamp']; 
			ki.forEach( function(k) {
				if ( k === 'datum') {
					console.log( `${k}: ${ e.get(k).toLocaleDateString("de-DE", { 
						year: 'numeric', month: '2-digit', day: '2-digit'}) }` );
				} 
				else if ( k === 'betrag') {
					console.log( `${k}: ${ ( e.get(k) / 100 ).toFixed(2) }` );
				}
				else {
					console.log( `${k}: ${e.get(k)}` );
				} 
			})
		});
	}		

};

haushaltsbuch.eintrag_hinzufuegen();
