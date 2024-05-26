//const isValidCharsModule = require('./isValidChars');
import isValidChars from './isValidChars';

export function vCount(nic){

    const TOLOWERCASE = nic.toLowerCase().split("");
    const CHECKCHARACTER_V = 'v';
    let VCOUNT = 0;
    for (let index = 0; index < TOLOWERCASE.length; index++) {
        const element = TOLOWERCASE[index];
        if(element == CHECKCHARACTER_V){VCOUNT++;}  
    }
    return VCOUNT;
}
export function xCount(nic){

    const TOLOWERCASE = nic.toLowerCase().split("");
    const CHECKCHARACTER_X = 'x';
    let XCOUNT = 0;
    for (let index = 0; index < TOLOWERCASE.length; index++) {
        const element = TOLOWERCASE[index];
        if(element == CHECKCHARACTER_X){XCOUNT++;}       
    }
    return XCOUNT;
}
