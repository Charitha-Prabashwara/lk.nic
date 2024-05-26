//const lengthValidation = require('../validationModule/lengthValidator');
import lengthValidator from '../validationModule/lengthValidator';
//const characterValidation = require('../validationModule/notInvalidChars');
import isValidChars from '../../support_func/isValidChars';
//const vxCheckValidation = require('../validationModule/v-and-xCheck');
import vxCheck from '../validationModule/v-and-xCheck';
//const getNicGeneration  = require('../../modules/generationModule/whichGeneration');
import Generation from '../../modules/generationModule/whichGeneration';

class BirthDay{
    #date;
    #nicNumber;
    #generation;
    
    set setIdentityNumber(nicNumber){
        this.#nicNumber = nicNumber;
        return this.isValidNIC;
    }

    get isValidNIC(){

        const LENGTHVALIDATION = lengthValidator(this.#nicNumber);
        const CHARACTERVALIDATION = isValidChars(this.#nicNumber);
        const VXVALIDATION = new vxCheck(this.#nicNumber).isValid();

        if(LENGTHVALIDATION && CHARACTERVALIDATION && VXVALIDATION){
            return true;
        }else{
            return false;
        }
    }

    get nicGeneration(){
        const GENERATION = new Generation().witchGeneration(this.#nicNumber);
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
        const YEAR = this.birthYear.toString();
        let DAYS;
        
        if(parseInt(YEAR) % 4 == 0){
            DAYS = this.days-1;
        }else{
            DAYS = this.days-2;
        }

        let DATE = new Date(YEAR);
        DATE.setDate(DATE.getDate() + DAYS);
        let result = parseInt(DATE.getMonth()+1);
        return result;
    
    }

    get monthName(){
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        
        return monthNames[this.month];
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
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const YEAR = this.birthYear.toString();
        let DAYS;
        
        if(parseInt(YEAR) % 4 == 0){
            DAYS = this.days-1;
        }else{
            DAYS = this.days-2;
        }

        let DATE = new Date(YEAR);
        DATE.setDate(DATE.getDate() + DAYS);
        let result = weekDays[parseInt(DATE.getDay())];
        return result;
    
    }

    

    constructor(nicNumber ='undefined'){ 
        if(!(typeof(nicNumber) === 'undefined')){
            this.#nicNumber = nicNumber;
            if(!this.isValidNIC){return false;}
        }
    }


    
}

export default BirthDay;