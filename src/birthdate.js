const lengthValidation = require('./lengthValidator');
const characterValidation = require('./notInvalidChars');
const vxCheckValidation = require('./v-and-xCheck');
const identifyGeneration = require('./whichGeneration');

const getNicGeneration  = require('./whichGeneration');

class BirthDate{
    #date;
    #nicNumber;
    
    set IdentityNumber(nicNumber){
        this.#nicNumber = nicNumber;
    }

    get isValidNIC(){

        const LENGTHVALIDATION = lengthValidation.lengthValidator(this.#nicNumber);
        const CHARACTERVALIDATION = characterValidation.ValidChars(this.#nicNumber);
        const VXVALIDATION = vxCheckValidation.vxCheck(this.#nicNumber).isValid();

        if(LENGTHVALIDATION && CHARACTERVALIDATION && VXVALIDATION){
            return true;
        }else{
            return false;
        }
    }

    get nicGeneration(){
        const GENERATION = getNicGeneration.Generation().witchGeneration(this.#nicNumber);
        if(!GENERATION){return false;}
        return GENERATION;
    }

    get #birthYearOldGen(){
        const result = "19" + this.#nicNumber.slice(0,3);
        console.log(parseInt(result,10));
        return parseInt(result,10);
    }

    get #birthYearNewGen(){
        const result = this.#nicNumber.slice(0,5);
        console.log(parseInt(result,10));
        return parseInt(result,10);
    }

    get birthYear(){
        
        let YEAR;

        const GENERATIONRESULT = getNicGeneration.Generation().witchGeneration(this.#nicNumber);
        if(!GENERATIONRESULT){return false;}
        
        if(GENERATIONRESULT == "1"){
            YEAR = this.#birthYearOldGen();
        }else if(GENERATIONRESULT == "2"){
            YEAR = this.#birthYearNewGen();
        }else{return false;}

        return YEAR;
    }

    

    constructor(nicNumber){
        this.#nicNumber = nicNumber;
        
        if(!this.isValidNIC()){return false;}


    }
}