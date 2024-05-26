const lengthValidation = require('./lengthValidator');
const characterValidation = require('./notInvalidChars');
const vxCheckValidation = require('./v-and-xCheck');
const getNicGeneration  = require('./whichGeneration');

class Gender{
    #nicNumber;
    #generation;

    get genderRoStr(){
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
            return 'male'
        }else{
            return false;
        }
    }

    get genderToInt(){
        const gender = this.genderRoStr;
        if(gender == 'female'){
            return 2;
        }else if(gender == 'male'){
            return 1;
        }else{
            return false;
        }
    }

    get isMale(){
        const gender = this.genderRoStr;
        if(gender == 'male'){
            return true;
        }else{
            return false;
        }
    }
    get isFemale(){
        const gender = this.genderRoStr;
        if(gender == 'female'){
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

    get #totalDaysOldGen(){
        const result = this.#nicNumber.slice(2, 5);
        return parseInt(result);
    }

    get #totalDaysNewGen(){
        const result = this.#nicNumber.slice(4, 7);
        return parseInt(result);
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

    set nicNumber(nicNumber){
        this.#nicNumber = nicNumber
        if(!this.isValidNIC){return false;}
    }

    constructor(nicNumber ='undefined'){ 
        if(!(typeof(nicNumber) === 'undefined')){
            this.#nicNumber = nicNumber;
            if(!this.isValidNIC){return false;}
        }
    }
}

module.exports ={Gender};