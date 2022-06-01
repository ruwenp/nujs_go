"use strict";

let einnahmen = 0;
let ausgaben = 0;

while (true) {
    let titel = prompt("Titel");
    let type = prompt("Type: Einnahme/Ausgabe");
    let betrag = prompt("Betrag");
    let datum = prompt("Datum", "JAHR-MM-TT");

    console.log( `
        titel: ${titel} 
        type: ${type} 
        Betrag: ${betrag} 
        datum: ${datum}
    `);

    if ( type === 'Einnahme' ) {
        einnahmen += parseInt(betrag);
    } else {
        ausgaben += parseInt(betrag);
    }

    let mehr_input_frage = prompt("Noch eine Angabe? j/n");
    if ( mehr_input_frage !== 'j' ) {
        break;
    }

}

let bilanz = einnahmen - ausgaben;

console.log( `Einnahmen: ${einnahmen} - Ausgaben: ${ausgaben} = ${bilanz}`);