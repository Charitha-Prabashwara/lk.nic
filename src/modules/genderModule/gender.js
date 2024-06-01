import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import DayRange from '../validationModule/dayRange.js';

class Gender{
    #nicNumber;
    #generation;
    #validate = new Validate();
    #dayRangeValidate = new DayRange();

    get genderToStr(){
        const generation = this.nicGeneration;
        let totalDays;
        
        if(generation == '1'){
            totalDays = this.#totalDaysOldGen;
        }else if(generation == '2'){
            totalDays = this.#totalDaysNewGen;
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

    get genderToInt(){
        const gender = this.genderToStr;
        if(gender == 'female'){
            return 2;
        }else if(gender == 'male'){
            return 1;
        }else{
            return false;
        }
    }

    get isMale(){
        const gender = this.genderToStr;
        if(gender == 'male'){
            return true;
        }else{
            return false;
        }
    }
    get isFemale(){
        const gender = this.genderToStr;
        if(gender == 'female'){
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

    get #totalDaysOldGen(){
        const result = this.#nicNumber.slice(2, 5);
        return parseInt(result);
    }

    get #totalDaysNewGen(){
        const result = this.#nicNumber.slice(4, 7);
        return parseInt(result);
    }

   
    set nicNumber(nicNumber){
        this.#nicNumber = nicNumber
        if(!this.#validate.isValidNIC(nicNumber)){return false;}
    }

    constructor(nicNumber ='undefined'){ 
        if(!(typeof(nicNumber) === 'undefined')){
            this.#nicNumber = nicNumber;
            if(!this.#validate.isValidNIC(nicNumber)){return false;}
        }
    }
}

export default Gender;
