"use strict";

console.log("hallo welt");
const minalter = 18;
let alter = prompt('alter eingeben:');
let msg = 'zu jung';

if( parseInt( alter ) > minalter  ) {
    msg = 'alt genug';
} 
else if ( parseInt( alter ) === minalter ) {
    msg = 'grade so ...';
}

const meine_func = function (){
    console.log("hallo Func");
};

console.log(msg);
meine_func();