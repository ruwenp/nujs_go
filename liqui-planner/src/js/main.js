"use strict";

let titel = prompt("Titel");
let type = prompt("Type: Einnahme/Ausgabe");
let betrag = prompt("Betrag");
let datum = prompt("Datum", "JAHR-MM-TT");

console.log( "titel: " + titel + " / type: " + type);
console.log( "Betrag: " + betrag + " / datum: " + datum);

let einnahmen = 0;
let ausgaben = 0;
let bilanz = einnahmen - ausgaben;

console.log( "Einnahmen: " + einnahmen + " - Ausgaben: " + ausgaben + ' = ' + bilanz);