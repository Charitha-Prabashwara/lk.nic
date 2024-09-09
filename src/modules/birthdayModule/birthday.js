
import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import exception from './exceptions/exception.js';

/**
 * @module BirthDay
 * @description 
 * The `BirthDay` class is designed to extract and compute the birth details (year, month, day) 
 * from a Sri Lankan National ID number. The class performs the extraction of birth data by using 
 * the encoded date information within the National ID, which includes the birth year and a numeric 
 * representation of the day of the year (DOY). The class supports both first- and second-generation 
 * National ID formats.
 * 
 * Validation of the ID number is handled by the `Validate` module, ensuring that only valid ID numbers 
 * are processed. Exception handling is also integrated, allowing developers to control how invalid inputs 
 * are treated.
 * 
 * The class offers methods to get specific birth information like year, month, day, and their respective names.
 * 
 * @param {string} identityNumber - The National ID number to be associated with the birthday object. The ID number 
 * must pass validation checks before being processed.
 * @throws {Error} Throws an exception if the ID number is invalid or improperly formatted.
 * @throws {TypeError} Throws an exception if invalid data types are provided for any method or parameter.
 * 
 * @date 2024/06/05
 * @extends exception
 * @example
 * // Example of using the BirthDay class
 * let birthday = new BirthDay("199012345678");
 * console.log(birthday.getBirthYear()); // Outputs the birth year
 * console.log(birthday.getDayName()); // Outputs the name of the day of birth, e.g., "Sunday"
 */
class BirthDay extends exception{
    
    #nic;  // Private field to store National ID

    /**
     * @property {string} identityNumber
     * @description 
     * Setter for the National ID number. This method adds a new National ID number to the 
     * birthday object, but only if the validity test is passed. If the ID number is invalid, 
     * it throws an appropriate exception. The ID number must be validated beforehand using 
     * the `Validate` module or exception handling must be applied.
     * 
     * @param {string} nationalIdentityCardNumber - The Sri Lankan National ID number.
     * @throws {Error} Throws an exception if the ID number is not valid.
     */
    set identityNumber(nationalIdentityCardNumber){
        //write unit-test -not yet 
        if(!new Validate().isValidNIC(nationalIdentityCardNumber)){

            this._exceptionInvalidNic();//exception
        }else{
            this.#nic = nationalIdentityCardNumber;
        }
    }
    
   
    set #nicSetter(nic){
        this.#nic = nic;
    }

    get #birthYearOldGen(){
        const result = "19" + this.#nic.slice(0,2);
        return parseInt(result,10);
    }

    get #birthYearNewGen(){
        const result = this.#nic.slice(0,4);
        return parseInt(result,10);
    }

    get #totalDaysOldGen(){
        const result = this.#nic.slice(2, 5);
        return parseInt(result);
    }

    get #totalDaysNewGen(){
        const result = this.#nic.slice(4, 7);
        return parseInt(result);
    }

    /**
     * @method getBirthYear
     * @description Retrieves the birth year encoded within the National ID number. The method identifies whether 
     * the ID is from the first- or second-generation format and extracts the appropriate birth year 
     * accordingly.
     * 
     * @throws {TypeError} Throws an exception if the result is inconsistent or unexpected.
     * @returns {int} The birth year of the ID cardholder.
     * @example
     * let birthday = new BirthDay("199012345678");
     * console.log(birthday.getBirthYear()); // Outputs the birth year: 1990
     */
    getBirthYear(){
        
        let year;
        const generationResult = new Generation().whichGeneration(this.#nic);
        
        if(generationResult == "1"){
            year = this.#birthYearOldGen;
        }else if(generationResult == "2"){
            year = this.#birthYearNewGen;
        }else{
            this._exceptionBirthYearDayUnexpectedResult();//exception
        }

        return year;
    }

    /**
     * @method getDays
     * @description 
     * Retrieves the number of days since January 1st of the birth year, as encoded in the National ID number. 
     * For female cardholders, this value is adjusted by subtracting 500 from the total.
     * 
     * @throws {TypeError} Throws an exception if the result is inconsistent or unexpected.
     * @returns {int} The total number of days from January 1st to the birth date.
     * @example
     * let birthday = new BirthDay("199012345678");
     * console.log(birthday.getDays()); // Outputs the number of days since January 1st.
     */
    getDays(){

        let days;

        const generationResult = new Generation().whichGeneration(this.#nic);
        
        if(generationResult == "1"){ days = this.#totalDaysOldGen;}
        else if(generationResult == "2"){days = this.#totalDaysNewGen;}
        else{this._exceptionBirthYearDayUnexpectedResult();}//exception

        if(days > 500){days -= 500;}
        return days;
    }

    /**
     * @method getMonth
     * @description 
     * Calculates and returns the birth month of the ID cardholder based on the number of days 
     * since January 1st and the encoded birth year.
     * 
     * @returns {int} The birth month as an integer (1-12).
     * @example
     * let birthday = new BirthDay("199012345678");
     * console.log(birthday.getMonth()); // Outputs the birth month: 6 (for June)
     */
    getMonth(){
        const year = this.getBirthYear().toString();
        let days;
        
        if(parseInt(year) % 4 == 0){
            days = this.getDays()-1;
        }else{
            days = this.getDays()-2;
        }

        let date = new Date(year);
        date.setDate(date.getDate() + days);
        let result = parseInt(date.getMonth()+1);
        return result;
    
    }

    /**
     * @method getMonthName
     * @description 
     * Retrieves the name of the birth month of the ID cardholder (e.g., "January", "February").
     * 
     * @returns {string} The name of the birth month.
     * @example
     * let birthday = new BirthDay("199012345678");
     * console.log(birthday.getMonthName()); // Outputs the birth month name: "June"
     */
    getMonthName(){
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
        
        return monthNames[this.getMonth()];
    }

    /**
     * @method getDay
     * @description 
     * Calculates and returns the birth day of the ID cardholder, based on the encoded number 
     * of days since January 1st.
     * 
     * @returns {int} The day of birth as an integer.
     * @example
     * let birthday = new BirthDay("199012345678");
     * console.log(birthday.getDay()); // Outputs the day of birth: 15
     */
    getDay(){
        const year = this.getBirthYear().toString();
        let days;
        
        if(parseInt(year) % 4 == 0){
            days = this.getDays()-1;
            
        }else{
            days = this.getDays()-2;
        }

        let date = new Date(year);
        date.setDate(date.getDate() + days);
        let result = parseInt(date.getDate());
        return result;
    }

   /**
     * @method getDayName
     * @description 
     * Retrieves the name of the day of birth (e.g., "Monday", "Tuesday") for the ID cardholder.
     * 
     * @returns {string} The name of the birth day.
     * @example
     * let birthday = new BirthDay("199012345678");
     * console.log(birthday.getDayName()); // Outputs the day name: "Saturday"
    */
    getDayName(){
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const year = this.getBirthYear().toString();
        let days;
        
        if(parseInt(year) % 4 == 0){
            days = this.getDays()-1;

        }else{
            days = this.getDays()-2;
        }

        let date = new Date(year);
        date.setDate(date.getDate() + days);
        let result = weekDays[parseInt(date.getDay())];
        return result;
    
    }
    
    /**
     * @constructor
     * @description 
     * Constructs a new `BirthDay` object to extract birth information from a Sri Lankan National ID number. 
     * If the National ID number is not provided during instantiation, it can be added later using the 
     * `identityNumber` setter. Exception handling can be enabled or disabled by passing a boolean value.
     * 
     * @param {string} [nationalIdentityCardNumber] - The Sri Lankan National ID number (optional).
     * @param {boolean} [exceptionSwitch=true] - Set to `false` to disable exceptions. Defaults to `true`.
     * @throws {TypeError} Throws an exception if the `exceptionSwitch` is not a boolean.
     * @throws {Error} Throws an exception if the ID number is not valid.
     * @example
     * // Create a BirthDay instance with a National ID
     */
    constructor(nationalIdentityCardNumber, exceptionSwitch = true){ 
        super();


        if(!(typeof(exceptionSwitch) === 'boolean')){
            this._exceptionSwitchTypeError();//exception

        }else{
           
            this._exceptionSwitch = exceptionSwitch;
        }
        
        if(!(typeof(nationalIdentityCardNumber) === 'undefined')){
            if(!new Validate().isValidNIC(nationalIdentityCardNumber)){this._exceptionInvalidNic()}//exception
            else{this.#nicSetter = nationalIdentityCardNumber}   
        }       
    }


    
}

export default BirthDay;