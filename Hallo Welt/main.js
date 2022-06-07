"use strict";


const pleaseSplit = function ( users) {
    let intr = users.split(",");
    let resp = intr.map( (x) => { return { 'email' : x.trim() } } );
    return resp;
}

let users = 'dsfv@sdv.de, vrvwe@srvre.sfv';

let oUsers = pleaseSplit(users);

console.log(users);
console.log(oUsers);