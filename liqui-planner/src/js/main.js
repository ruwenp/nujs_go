"use strict";

let haushaltsbuch = {
	
	gesamtbilanz : new Map(),

	eintraege : [],

	fehler: [],

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
		if ( typ_raw === null ) {
			this.fehler.push('Bitte einen Typ definieren');
		} else {
			typ_raw = typ_raw.trim().toLowerCase();

			if ( typ_raw.length > 0 ) {
				if ( ['einnahme', 'ein', 'e'].includes( typ_raw )) { 
					return 'Einnahme';
				} else {
					return 'Ausgabe';
				}
			} else {
				this.fehler.push('Bitte einen Typ definieren');
			}
		}
	},

	titel_verarbeiten(titel_raw){
		if ( titel_raw === null ) {
			this.fehler.push('Leerer Titel ist ungültig');
		} else {
			titel_raw = titel_raw.trim();
			if ( titel_raw.length > 0 ) {
				return titel_raw;
			} else {
				this.fehler.push('Leerer Titel ist ungültig');
			}
		}
	},

	datum_verarbeiten(datum_raw){
		if ( datum_raw === null ) {
			this.fehler.push('Ungültige Datums-Eingabe!');
		} else {
			datum_raw = datum_raw.trim();
			if ( this.datum_validieren(datum_raw) === true ) {
				let datum = new Date(`${datum_raw} 00:00:00`);
				return datum;
			} else {
				this.fehler.push(`Ungültige Datums-Eingabe: ${datum_raw}`);
			}
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
		if ( betrag_raw === null ) {
			this.fehler.push('Ungültige Euro-Eingabe!');
		} else {
			betrag_raw = betrag_raw.trim();
			if ( this.betrag_validieren(betrag_raw) === true ) { 
				let betrag = parseInt( parseFloat( betrag_raw.replace(',', '.') ) * 100 );
				return betrag;
			} else {
				this.fehler.push(`Ungültige Euro-Eingabe: ${betrag_raw}`);
			}
		}
	},

	betrag_validieren(betrag_raw){
		if (  betrag_raw.match(/^\d+[\.\,]{0,1}\d+$/) !== null ) {
			return true;
		} else {
			return false;
		}
	},

	html_gesamtbilanz_generieren(){ 
		let gb = document.querySelector("#gesamtbilanz");

		// <div class="gesamtbilanz-zeile einnahmen"><span>Einnahmen:</span><span>4228,74€</span></div>
		let div_in = document.createElement('div');
		div_in.setAttribute("class", "gesamtbilanz-zeile einnahmen");
		let span_a_in = document.createElement('span');
		span_a_in.textContent = 'Einnahmen:';
		div_in.appendChild(span_a_in);
		let span_b_in = document.createElement('span');
		span_b_in.textContent = `${(this.gesamtbilanz.get('einnahmen') / 100).toFixed(2).replace(/\./, ",") } €`;
		div_in.appendChild(span_b_in);
		gb.insertAdjacentElement("beforeend", div_in);

        // <div class="gesamtbilanz-zeile ausgaben"><span>Ausgaben:</span><span>2988,88€</span></div>		
		let div_out = document.createElement('div');
		div_out.setAttribute("class", "gesamtbilanz-zeile ausgaben");
		let span_a_out = document.createElement('span');
		span_a_out.textContent = 'Ausgaben:';
		div_out.appendChild(span_a_out);
		let span_b_out = document.createElement('span');
		span_b_out.textContent = `${(this.gesamtbilanz.get('ausgaben') / 100).toFixed(2).replace(/\./, ",") } €`;
		div_out.appendChild(span_b_out);
		gb.insertAdjacentElement("beforeend", div_out);

        // <div class="gesamtbilanz-zeile bilanz"><span>Bilanz:</span><span class="positiv">1239,86€</span></div>
		let div_bi = document.createElement('div');
		div_bi.setAttribute("class", "gesamtbilanz-zeile bilanz");
		let span_a_bi = document.createElement('span');
		span_a_bi.textContent = 'Bilanz:';
		div_bi.appendChild(span_a_bi);
		let span_b_bi = document.createElement('span');
		span_b_bi.textContent = `${(this.gesamtbilanz.get('bilanz') / 100).toFixed(2).replace(/\./, ",") } €`;
		if ( this.gesamtbilanz.get('bilanz') >= 0 ) {			
			span_b_bi.setAttribute("class", "positiv");
		} else {
			span_b_bi.setAttribute("class", "negativ");
		}
		div_bi.appendChild(span_b_bi);
		gb.insertAdjacentElement("beforeend", div_bi);
	},

	gesamtbilanz_anzeigen(){
		document.querySelectorAll("#gesamtbilanz > div").forEach( function(al){
			al.remove('div')
		});		
		this.html_gesamtbilanz_generieren();		
	},

	eintrag_hinzufuegen(){
		let weiterer_eintrag = true;
		while(weiterer_eintrag){
			this.eintrag_erfassen();
			this.eintraege_anzeigen();
			this.gesamtbilanz_erstellen();		
			this.gesamtbilanz_anzeigen();
			weiterer_eintrag = confirm("Weiteren Eintrag hinzufügen?");		
		}
	},

	html_eintrag_generieren(e) {
		let li = document.createElement("li");
		li.setAttribute("data-timestamp", e.get('timestamp'));
		if ( e.get('typ') === 'Einnahme' ) {
			li.setAttribute("class", "einnahme");
		} else {
			li.setAttribute("class", "ausgabe");
		}

		let span_datum_txt = document.createTextNode(
			`${e.get("datum").toLocaleDateString("de-DE", { year: 'numeric', month: '2-digit', day: '2-digit'})} `);
		let span_datum = document.createElement("span");
		span_datum.setAttribute("class", "datum");
		span_datum.appendChild(span_datum_txt);		
		li.appendChild(span_datum);

		let span_titel_txt = document.createTextNode(e.get('titel'));
		let span_titel = document.createElement("span");
		span_titel.setAttribute("class", "titel");			
		span_titel.appendChild(span_titel_txt);
		li.appendChild(span_titel);

		let span_betrag_txt = document.createTextNode(`${ ( e.get('betrag') / 100 ).toFixed(2).replace(/\./, ',') } €`);
		let span_betrag = document.createElement("span");
		span_betrag.setAttribute("class", "betrag");
		span_betrag.appendChild(span_betrag_txt); 
		li.appendChild(span_betrag);

		let button = document.createElement("button");
		button.setAttribute("class", "entfernen-button");
		let i_trash = document.createElement("i");
		i_trash.setAttribute("class", "fas fa-trash");
		button.appendChild(i_trash);
		li.appendChild(button);

		return li;
	},

	eintraege_anzeigen() {
		// ul löschen, falls vorhanden
		document.querySelectorAll(".monatsliste ul").forEach( function(al){
			al.remove('ul')
		});

		// ul anlegen
		let ul = document.createElement("ul");

		// this.eintraege.forEach( function(e){
		for ( let e of this.eintraege ) {
			ul.appendChild(this.html_eintrag_generieren(e));
		}

		// ul in article.monatsliste einsetzen
		let ele = document.querySelector(".monatsliste");	
		ele.appendChild(ul);
	},

	gesamtbilanz_erstellen() {
		let neue_gesamtbilanz = new Map();
		neue_gesamtbilanz.set('einnahmen', 0);
		neue_gesamtbilanz.set('ausgaben', 0);
		neue_gesamtbilanz.set('bilanz', 0);

		this.eintraege.forEach(function(i){

			if ( i.get('typ') === 'Einnahme' ) {
        		neue_gesamtbilanz.set('einnahmen', ( neue_gesamtbilanz.get('einnahmen') + parseInt(i.get('betrag')) ));
        		neue_gesamtbilanz.set('bilanz', (neue_gesamtbilanz.get('bilanz') + parseInt(i.get('betrag')) ));
    		} else {
        		neue_gesamtbilanz.set('ausgaben', (neue_gesamtbilanz.get('ausgaben') + parseInt(i.get('betrag')) ));
        		neue_gesamtbilanz.set('bilanz', (neue_gesamtbilanz.get('bilanz') - parseInt(i.get('betrag')) ));
    		}
		});

		this.gesamtbilanz = neue_gesamtbilanz;

	}

};

haushaltsbuch.eintrag_hinzufuegen();
