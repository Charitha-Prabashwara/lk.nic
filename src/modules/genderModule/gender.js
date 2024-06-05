import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import DayRange from '../validationModule/dayRange.js';

class Gender{
    #nicNumber;
    #generation;
    #validate = new Validate();
    #dayRangeValidate = new DayRange();

    genderToStr(nationalIdentityCardNumber){
        let generation;
        if(nationalIdentityCardNumber === undefined){generation = this.nicGeneration();}
        else{generation = this.nicGeneration(nationalIdentityCardNumber);}
        
        let totalDays;
        if(generation == '1'){
            
            if(nationalIdentityCardNumber === undefined){totalDays = this.#totalDaysOldGen();}
            else{totalDays = this.#totalDaysOldGen(nationalIdentityCardNumber)}

        }else if(generation == '2'){
            
            if(nationalIdentityCardNumber === undefined){ totalDays = this.#totalDaysNewGen();}
            else{ totalDays = this.#totalDaysNewGen(nationalIdentityCardNumber);}
        }else{
            return false;
        }

        if(totalDays > 500){
            return 'female';
        }else if(totalDays < 500){
            return 'male';
        }else if(!this.#dayRangeValidate.isValidDayRangeFromEpoch(totalDays)){
            return false;
        }
        else{
            return false;
        }
    }

    genderToInt(nationalIdentityCardNumber){
        let gender;
        if(nationalIdentityCardNumber === undefined){gender = this.genderToStr();}
        else{gender = this.genderToStr(nationalIdentityCardNumber);}
        
        if(gender == 'female'){
            return 2;
        }else if(gender == 'male'){
            return 1;
        }else{
            return false;
        }
    }

    isMale(nationalIdentityCardNumber){
        let gender;
        if(nationalIdentityCardNumber === undefined){gender = this.genderToStr();}
        else{gender = this.genderToStr(nationalIdentityCardNumber);}

        if(gender == 'male'){
            return true;
        }else{
            return false;
        }
    }
    isFemale(nationalIdentityCardNumber){
        let gender;
        if(nationalIdentityCardNumber === undefined){gender = this.genderToStr();}
        else{gender = this.genderToStr(nationalIdentityCardNumber);}

        if(gender == 'female'){
            return true;
        }else{
            return false;
        }
    }

    nicGeneration(nationalIdentityCardNumber){

        let GENERATION = new Generation();
        if(nationalIdentityCardNumber === undefined){GENERATION = GENERATION.witchGeneration(this.#nicNumber);}
        else{GENERATION = GENERATION.witchGeneration(nationalIdentityCardNumber);}
        
        if(!GENERATION){return false;}

        this.#generation = GENERATION;
        return GENERATION;
    }

    #totalDaysOldGen(nationalIdentityCardNumber){
        let result;
        if(nationalIdentityCardNumber === undefined){result = this.#nicNumber.slice(2, 5);}
        else{result = nationalIdentityCardNumber.slice(2, 5);}
        return parseInt(result);
    }

    #totalDaysNewGen(nationalIdentityCardNumber){
        let result;
        if(nationalIdentityCardNumber === undefined){result = this.#nicNumber.slice(4, 7);}
        else{result = nationalIdentityCardNumber.slice(4, 7);}
        return parseInt(result);
    }

   
    set nicNumber(nationalIdentityCardNumber){
        this.#nicNumber = nationalIdentityCardNumber
        if(!this.#validate.isValidNIC(nationalIdentityCardNumber)){return false;}
    }

    constructor(nicNumber ='undefined'){ 
        if(!(typeof(nicNumber) === 'undefined')){
            this.#nicNumber = nicNumber;
            if(!this.#validate.isValidNIC(nicNumber)){return false;}
        }
    }
}

export default Gender;
