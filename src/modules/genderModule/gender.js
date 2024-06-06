import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import DayRange from '../validationModule/dayRange.js';

/**
 * @module Gender
 * @description Gender can be found using "Gender".
 * Only a valid input will get the correct output.
 * @author Charitha Prabhashwara
 * @email prabhashwara.seu@gmail.com
 * @date 2024/06/05
 */
class Gender{
    #nicNumber;
    #generation;
    #validate = new Validate();
    #dayRangeValidate = new DayRange();

    /**
     * @method genderToInt
     * @description Gender is treated as an string. female or male.
     * Returns false if validation tests fail.
     * @param {string} nationalIdentityCardNumber 
     * @returns {1 | 2 | false}
     * @example
     * let gender = Gender(your national-identity-card number");
     * if(gender){
     *      console.log(gender.genderToInt());  
     * }else{
     *      console.log("Invalid NIC");
     * }
     * @date 2024/06/06
     */
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
    /**
     * @method genderToInt
     * @description Gender is treated as an integer. 2 for female and 1 for male.
     * Returns false if validation tests fail.
     * @param {string} nationalIdentityCardNumber 
     * @returns {1 | 2 | false}
     * @example
     * let gender = Gender(your national-identity-card number");
     * if(gender){
     *      console.log(gender.genderToInt());  
     * }else{
     *      console.log("Invalid NIC");
     * }
     * @date 2024/06/06
     */
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
     /**
     * @method isMale
     * @description The National Identity Card number entered gives whether it is of a male. **(true)** or **(false)**.
     * @param {string} nationalIdentityCardNumber
     * @returns {boolean}
     * @example
     * let gender = Gender(your national-identity-card number");
     * if(gender){
     *      console.log(gender.isMale());  
     * }else{
     *      console.log("Invalid NIC");
     * }
     * @date 2024/06/05/06
     */
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
    /**
     * @method isFemale
     * @description The National Identity Card number entered gives whether it is of a female. **(true)** or **(false)**.
     * @param {string} nationalIdentityCardNumber
     * @returns {boolean}
     * @example
     * let gender = Gender(your national-identity-card number");
     * if(gender){
     *      console.log(gender.isFemale());   
     * }else{
     *      console.log("Invalid NIC");
     * }
     * @date 2024/06/06
     */
    isFemale(nationalIdentityCardNumber){
        let gender;
        if(nationalIdentityCardNumber === undefined){gender = this.genderToStr();}
        else{gender = this.genderToStr(nationalIdentityCardNumber);}

        if(gender == 'female'){
            return true;
        }
        return false;     
    }
    /**
     * @method nicGeneration
     * @description Outputs the generation of the ID number(string). Returns "false" if not valid.
     * @param {string} nationalIdentityCardNumber 
     * @returns {false | "1" | "2"}
     * @example
     * //example one
     * let gender = Gender();
     * if(gender.nicNumber("your national-identity-card number")){
     *      console.log(gender.nicGeneration());   
     * }else{
     *      console.log("Invalid NIC");
     * }
     * //example two
     * let gender = Gender("your national-identity-card number");
     * if(gender)){
     *      console.log(gender.nicGeneration())   
     * }else{
     *      console.log("Invalid NIC");
     * }
     * @date 2024/06/05
    */
    nicGeneration(nationalIdentityCardNumber){

        let GENERATION = new Generation();
        if(nationalIdentityCardNumber === undefined){GENERATION = GENERATION.witchGeneration(this.#nicNumber);}
        else{GENERATION = GENERATION.witchGeneration(nationalIdentityCardNumber);}
        
        if(!GENERATION){return false;}

        this.#generation = GENERATION;
        return GENERATION;
    }
    /**
     * @method totalDaysOldGen
     * @description Obtaining dates related to the year of birth of the first generation ID numbers.
     * @param {string} nationalIdentityCardNumber 
     * @returns {int}
     * @date 2024/06/05
    */
    #totalDaysOldGen(nationalIdentityCardNumber){
        let result;
        if(nationalIdentityCardNumber === undefined){result = this.#nicNumber.slice(2, 5);}
        else{result = nationalIdentityCardNumber.slice(2, 5);}
        return parseInt(result);
    }
    /**
     * @method totalDaysNewGen
     * @description Obtaining dates related to the year of birth of the second generation ID numbers.
     * @param {string} nationalIdentityCardNumber 
     * @returns {int}
     * @date 2024/06/05
     */
    #totalDaysNewGen(nationalIdentityCardNumber){
        let result;
        if(nationalIdentityCardNumber === undefined){result = this.#nicNumber.slice(4, 7);}
        else{result = nationalIdentityCardNumber.slice(4, 7);}
        return parseInt(result);
    }

    /**
     * @method nicNumber
     * @description The "Gender" object can be used when entering a new ID number or updating a previously entered number.
     * Returns a boolean type. Returns true if valid.
     * @param {string} nationalIdentityCardNumber
     * @returns {boolean}
     * @example
     * //new object
     * let gender = Gender();
     * if(gender.nicNumber("your national-identity-card number")){
     *      console.log("Valid NIC");
     * }else{
     *      console.log("Invalid NIC");
     * }
     * //set new nic
     * let gender = Gender("xxxxxxxxxxxx");
     * if(gender.nicNumber("your national-identity-card number")){
     *      console.log("Valid NIC");
     * }else{
     *      console.log("Invalid NIC");
     * }
     * @date 2024/06/05
     */
    nicNumber(nationalIdentityCardNumber){
        this.#nicNumber = nationalIdentityCardNumber
        if(!this.#validate.isValidNIC(nationalIdentityCardNumber)){return false;}
        else{return true;}
    }

    /**
     * @constructor
     * @description An object can be created by giving the National ID number or without any parameters.
     * If the object is created by providing the National ID number,
     * it is not mandatory to provide the ID number when using other methods.
     * If the ID number is not provided, the ID number should be applied when using the methods.
     * @param {string} [nationalIdentityCardNumber='undefined'] 
     * @returns {boolean | undefined}
     * @example 
     * let gender = Gender("your national-identity-card number");
     * if(!gender){
     *      console.log("invalid national identity card number");
     * }else{
     *      console.log(gender.genderToStr());
     * }
     * //second example
     * let gender = Gender();
     * if(!gender.nicNumber("your national-identity-card number")){
     *      console.log("invalid national identity card number");
     * }else{
     *      console.log(gender.genderToStr());
     * }
     * 
     * @date 2024/06/05
     */
    constructor(nationalIdentityCardNumber ='undefined'){ 
        if(!(typeof(nationalIdentityCardNumber) === 'undefined')){
            this.#nicNumber = nationalIdentityCardNumber;
            if(!this.#validate.isValidNIC(nationalIdentityCardNumber)){return false;}
            else{return false}
        }
    }
}

export default Gender;
