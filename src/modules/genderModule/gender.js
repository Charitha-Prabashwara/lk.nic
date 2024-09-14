import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import DayRange from '../validationModule/dayRange.js';
import exception from './exceptions/exception.js';

/**
 * @module Gender
 * @description
 * The `Gender` class determines the gender of an individual based on their Sri Lankan National Identity Card (NIC) number. 
 * It validates the NIC number and decodes gender-related information. The class provides multiple methods to:
 * 
 * 1. Derive gender as a string ('male' or 'female').
 * 2. Derive gender as an integer (1 for male, 2 for female).
 * 3. Check whether the NIC corresponds to a male or female individual.
 * 
 * The class supports both old and new NIC formats and uses validation techniques to ensure the NIC number is valid before 
 * performing gender determination. If validation fails, exceptions are raised, unless exceptions are disabled through 
 * the `exceptionSwitch` parameter.
 * 
 * ### Inheritance from `exception`
 * The `Gender` class extends the `exception` superclass. The `exception` class provides mechanisms to handle specific error 
 * scenarios, such as invalid NIC numbers, incorrect data types, and unexpected results. This inheritance allows the `Gender` 
 * class to throw structured errors using pre-defined messages for ease of debugging and maintenance.
 * 
 * Exceptions can be managed through the `exceptionSwitch`. If exceptions are enabled (default behavior), the class will 
 * throw errors when validation fails. If exceptions are disabled, the class will return `false` for invalid inputs without 
 * interrupting execution.
 * 
 * @extends exception
 * @version 1.0.0
 * @date June 5, 2024
 * @example
 * const gender = new Gender('123456789V');
 * console.log(gender.genderToStr());  // Outputs: 'male' or 'female'
 * @author Charitha Prabhashwara
 */
class Gender extends exception{
    #nicNumber;
    #generation;
    #validate = new Validate();
    #dayRangeValidate = new DayRange();

/**
     * @method genderToStr
     * @description 
     * Determines the gender based on the provided NIC number and returns it as a string ('male' or 'female').
     * If the NIC number is invalid, an exception is raised (if exceptions are enabled).
     * 
     * This method handles exceptions like:
     * - **Invalid NIC**: Raised if the NIC fails validation.
     * - **Unexpected Result**: Raised if unexpected values are encountered during processing.
     * 
     * @param {string} [nationalIdentityCardNumber] - Optional NIC number to derive the gender from.
     * If not provided, the method uses the NIC number stored in the class instance.
     * @returns {'male' | 'female'} - Returns the gender as a string, or raises an exception if validation fails.
     * @throws {Error} Throws if the NIC is invalid or an unexpected result occurs (if `exceptionSwitch` is true).
     */
    genderToStr(nationalIdentityCardNumber){
        let generation;
        if(nationalIdentityCardNumber === undefined){generation = this.#nicGeneration();}
        else{generation = this.#nicGeneration(nationalIdentityCardNumber);}
        
        let totalDays;
        if(generation == '1'){
            
            if(nationalIdentityCardNumber === undefined){totalDays = this.#totalDaysOldGen();}
            else{totalDays = this.#totalDaysOldGen(nationalIdentityCardNumber)}

        }else if(generation == '2'){
            
            if(nationalIdentityCardNumber === undefined){ totalDays = this.#totalDaysNewGen();}
            else{ totalDays = this.#totalDaysNewGen(nationalIdentityCardNumber);}
        }else{
            this._exceptionUnexpectedResult()//exception
        }

        if(totalDays > 500){
            return 'female';
        }else if(totalDays < 500){
            return 'male';
        }else if(!this.#dayRangeValidate.isValidDayRangeFromEpoch(totalDays)){
            this. _exceptionInvalidNic();
            //This is important please, you must re check this.
            //Noted- 2024/9/6 10:46AM
            //checked - 2024/09/14 9:51am - charitha
        }
        else{
            this._exceptionUnexpectedResult()//exception
        }
    }
    /**
     * @method genderToInt
     * @description 
     * Determines the gender as an integer: 1 for male, 2 for female. 
     * If the NIC number is invalid, an exception is raised (if exceptions are enabled).
     * 
     * This method handles the same exceptions as `genderToStr`.
     * 
     * @param {string} [nationalIdentityCardNumber] - Optional NIC number to derive the gender from.
     * If not provided, the method uses the NIC number stored in the class instance.
     * @returns {1 | 2} - 1 for male, 2 for female, or raises an exception if validation fails.
     * @throws {Error} Throws if the NIC is invalid or an unexpected result occurs (if `exceptionSwitch` is true).
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
            this._exceptionUnexpectedResult();
        }
    }
    
    /**
     * @method isMale
     * @description 
     * Checks if the provided or stored NIC number corresponds to a male.
     * Returns `true` if the NIC belongs to a male, `false` otherwise.
     * 
     * @param {string} [nationalIdentityCardNumber] - Optional NIC number to check.
     * @returns {boolean} - `true` if male, `false` otherwise.
     * @throws {Error} Throws an exception if validation fails or unexpected results occur (if `exceptionSwitch` is true).
     */
    isMale(nationalIdentityCardNumber){
        let gender;
        if(nationalIdentityCardNumber === undefined){gender = this.genderToStr();}
        else{gender = this.genderToStr(nationalIdentityCardNumber);}

        if(gender == 'male'){
            return true;
        }
        return false;
        
    }

    /**
     * @method isFemale
     * @description 
     * Checks if the provided or stored NIC number corresponds to a female.
     * Returns `true` if the NIC belongs to a female, `false` otherwise.
     * 
     * @param {string} [nationalIdentityCardNumber] - Optional NIC number to check.
     * @returns {boolean} - `true` if female, `false` otherwise.
     * @throws {Error} Throws an exception if validation fails or unexpected results occur (if `exceptionSwitch` is true).
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
     * @method #nicGeneration
     * @description 
     * Determines the generation of the provided NIC number. 
     * Generation 1 corresponds to older NIC formats, while Generation 2 corresponds to newer formats. 
     * Returns '1' for old NIC format, '2' for new NIC format, and raise exception if validation fails.
     * 
     * @param {string} [nationalIdentityCardNumber] - The NIC number to check for generation.
     * @returns {'1' | '2'} - The generation of the NIC number. raise exception if invalid.
     * 
     * @example
     * const gender = new Gender('123456789V');
     * console.log(gender.#nicGeneration());  // Outputs: '1' or '2'
     * 
     * @date June 5, 2024
     */
    #nicGeneration(nationalIdentityCardNumber){

        let generation = new Generation();
        if(nationalIdentityCardNumber === undefined){generation = generation.whichGeneration(this.#nicNumber);}
        else{generation = generation.whichGeneration(nationalIdentityCardNumber);}
        this.#generation = generation;
        return generation;
    }
    /**
     * @method #totalDaysOldGen
     * @description 
     * Extracts the day of the year encoded in an old format NIC number.
     * 
     * @param {string} [nationalIdentityCardNumber] - The NIC number to extract the total days from.
     * @returns {number} - The day of the year encoded in the NIC number.
     */
    #totalDaysOldGen(nationalIdentityCardNumber){
        let result;
        if(nationalIdentityCardNumber === undefined){result = this.#nicNumber.slice(2, 5);}
        else{result = nationalIdentityCardNumber.slice(2, 5);}
        return parseInt(result);
    }
     /**
     * @method #totalDaysNewGen
     * @description 
     * Extracts the day of the year encoded in a new format NIC number.
     * 
     * @param {string} [nationalIdentityCardNumber] - The NIC number to extract the total days from.
     * @returns {number} - The day of the year encoded in the NIC number.
     */
    #totalDaysNewGen(nationalIdentityCardNumber){
        let result;
        if(nationalIdentityCardNumber === undefined){result = this.#nicNumber.slice(4, 7);}
        else{result = nationalIdentityCardNumber.slice(4, 7);}
        return parseInt(result);
    }
   /**
     * @method nicNumber
     * @description 
     * Sets or updates the NIC number for this `Gender` object. The NIC is validated before being stored.
     * Returns `true` if the NIC is valid, otherwise raises an exception or returns `false` (depending on `exceptionSwitch`).
     * 
     * @param {string} nationalIdentityCardNumber - The NIC number to set or update.
     * @returns {boolean} - `true` if the NIC is valid, `false` if invalid and exceptions are disabled.
     * 
     */
    nicNumber(nationalIdentityCardNumber){
        this.#nicNumber = nationalIdentityCardNumber
        if(!this.#validate.isValidNIC(nationalIdentityCardNumber)){return false;}
        else{return true;}
    }

    /**
     * @constructor
     * @description
     * Creates an instance of the `Gender` class, with optional NIC number and exception handling configuration.
     * 
     * If the NIC number is provided during object creation, it is validated and stored. The `exceptionSwitch` parameter
     * allows you to enable or disable exceptions. By default, exceptions are enabled. If disabled, the class will return 
     * `false` instead of throwing errors.
     * 
     * ### Exceptions
     * - **Invalid NIC Exception**: If the provided NIC number is invalid, the `_exceptionInvalidNic` method is triggered.
     * - **Exception Switch Type Error**: If the `exceptionSwitch` parameter is not of type `boolean`, the 
     *   `_exceptionSwitchTypeError` method is triggered.
     * 
     * @param {string} [nationalIdentityCardNumber] - Optional NIC number to be used during initialization.
     * @param {boolean} [exceptionSwitch=true] - Optional flag to toggle exception handling. Defaults to `true` (exceptions enabled).
     * @returns {Gender} - The constructed `Gender` object.
     * @throws {Error} Throws if the NIC is invalid (if `exceptionSwitch` is true).
     * @throws {TypeError} Throws if the 'exceptionSwitch' type isn't boolean.(true or false).
     */
    constructor(nationalIdentityCardNumber, exceptionSwitch=true){ 
        super();
        
        if(!(typeof(exceptionSwitch) === 'boolean')){this._exceptionSwitchTypeError();}//exception
        else{this._exceptionSwitch = exceptionSwitch;}
        
        if(!(typeof(nationalIdentityCardNumber) === 'undefined')){
            if(!this.#validate.isValidNIC(nationalIdentityCardNumber)){this._exceptionInvalidNic()}//exception
            else{this.#nicNumber = nationalIdentityCardNumber;}
        }
    }
}

export default Gender;
