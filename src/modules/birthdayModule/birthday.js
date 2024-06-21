
import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';

class BirthDay{
    #date;
    #nationalIdentityCardNumber;
    #generation;
    #validator= new Validate();

    set setIdentityNumber(nationalIdentityCardNumber){
        this.#nationalIdentityCardNumber = nationalIdentityCardNumber;
        return this.#validator.isValidNIC(nationalIdentityCardNumber);
    }

    nicGeneration(nationalIdentityCardNumber){
        let GENERATION = new Generation();
        if(nationalIdentityCardNumber === undefined){GENERATION = GENERATION.witchGeneration(this.#nationalIdentityCardNumber);}
        else{GENERATION = GENERATION.witchGeneration(nationalIdentityCardNumber)}
        if(!GENERATION){return false;}

        this.#generation = GENERATION;
        return GENERATION;
    }

    get #birthYearOldGen(){
        const result = "19" + this.#nationalIdentityCardNumber.slice(0,2);
        return parseInt(result,10);
    }

    get #birthYearNewGen(){
        const result = this.#nationalIdentityCardNumber.slice(0,4);
        return parseInt(result,10);
    }

    get #totalDaysOldGen(){
        const result = this.#nationalIdentityCardNumber.slice(2, 5);
        return parseInt(result);
    }

    get #totalDaysNewGen(){
        const result = this.#nationalIdentityCardNumber.slice(4, 7);
        return parseInt(result);
    }

    get birthYear(){
        
        let YEAR;

        const GENERATIONRESULT = this.nicGeneration();
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

        const GENERATIONRESULT = this.nicGeneration();
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

    

    constructor(nationalIdentityCardNumber ='undefined'){ 

        if(!(typeof(nationalIdentityCardNumber) === 'undefined')){
            this.#nationalIdentityCardNumber = nationalIdentityCardNumber;
            if(!this.#validator.isValidNIC(nationalIdentityCardNumber)){return false;}
            return true;
        }
    }


    
}

export default BirthDay;