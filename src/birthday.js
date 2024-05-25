const lengthValidation = require('./lengthValidator');
const characterValidation = require('./notInvalidChars');
const vxCheckValidation = require('./v-and-xCheck');

const getNicGeneration  = require('./whichGeneration');

//import { parseISO, addDays, format } from '../node_modules/date-fns';

class BirthDay{
    #date;
    #nicNumber;
    #generation;
    
    set IdentityNumber(nicNumber){
        this.#nicNumber = nicNumber;
    }

    get isValidNIC(){

        const LENGTHVALIDATION = lengthValidation.lengthValidator(this.#nicNumber);
        const CHARACTERVALIDATION = characterValidation.ValidChars(this.#nicNumber);
        const VXVALIDATION = new vxCheckValidation.vxCheck(this.#nicNumber).isValid();

        if(LENGTHVALIDATION && CHARACTERVALIDATION && VXVALIDATION){
            return true;
        }else{
            return false;
        }
    }

    get nicGeneration(){
        const GENERATION = new getNicGeneration.Generation().witchGeneration(this.#nicNumber);
        if(!GENERATION){return false;}

        this.#generation = GENERATION;
        return GENERATION;
    }

    get #birthYearOldGen(){
        const result = "19" + this.#nicNumber.slice(0,2);
        return parseInt(result,10);
    }

    get #birthYearNewGen(){
        const result = this.#nicNumber.slice(0,4);
        return parseInt(result,10);
    }

    get #totalDaysOldGen(){
        const result = this.#nicNumber.slice(2, 5);
        return parseInt(result);
    }

    get #totalDaysNewGen(){
        const result = this.#nicNumber.slice(4, 7);
        return parseInt(result);
    }

    get birthYear(){
        
        let YEAR;

        const GENERATIONRESULT = this.nicGeneration;
        if(!GENERATIONRESULT){return false;}
        
        if(GENERATIONRESULT == "1"){
            YEAR = this.#birthYearOldGen;
        }else if(GENERATIONRESULT == "2"){
            YEAR = this.#birthYearNewGen;
        }else{return false;}

        return YEAR;
    }

    get days(){

        let DAYS;

        const GENERATIONRESULT = this.nicGeneration;
        if(!GENERATIONRESULT){return false;}

        if(GENERATIONRESULT == "1"){
            DAYS = this.#totalDaysOldGen;
        }else if(GENERATIONRESULT == "2"){
            DAYS = this.#totalDaysNewGen;
        }else{return false;}
        if(DAYS > 500){DAYS -= 500;}
        return DAYS;
    }

    get month(){
        const YEAR = this.birthYear.toString() + "-01-01";
        const DAYS = this.days -1;

        const DATE = new Date(YEAR);
        DATE.setDate(DATE.getDate() + DAYS);
        return parseInt(DATE.getMonth()+1, 10);
    }

    get monthName(){
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        
        return monthNames[this.month];
    }

    get week(){

    }

    get day(){
        const YEAR = this.birthYear.toString();
        let DAYS;
        
        if(parseInt(YEAR) % 4 == 0){
            DAYS = this.days-1;
        }else{
            DAYS = this.days-2;
        }

        let DATE = new Date(YEAR);
        DATE.setDate(DATE.getDate() + DAYS);
        let result = parseInt(DATE.getDate());
        return result;
    }

    get dayName(){
        
    }

    

    constructor(nicNumber){
        this.#nicNumber = nicNumber;
        
        //if(!this.isValidNIC()){return false;}


    }
}

module.exports={BirthDay};