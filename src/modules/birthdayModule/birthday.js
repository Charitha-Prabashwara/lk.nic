
import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import exception from './exceptions/exception.js';

/**
 * 
 * @module BirthDay
 * @description This is used to find the date, month, and birth year in a National ID number.
 * @author Charitha Prabhashwara
 * @email prabhashwara.seu@gmail.com
 * 
 * @param {string} identityNumber - This can be used to add a new national ID number to the birthday object.
 * It will be executed only if the validity test is passed and if an invalid ID number is entered,
 * the corresponding exception will be executed. In case of a new entry, 
 * use 'exception handling techniques' or use the 'validation' module to enter with prior validation.
 * @date 2024/06/05
 */
class BirthDay extends exception{
    
    #nic;
    #generation;
   
    
    /**
     * identityNumber
     * @description This can be used to add a new national ID number to the birthday object.
     * It will be executed only if the validity test is passed and if an invalid ID number is entered,
     * the corresponding exception will be executed. In case of a new entry,
     * use 'exception handling techniques' or use the 'validation' module to enter with prior validation.
     * @param {string} nationalIdentityCardNumber - National identity card number Sri Lanka
     * @throws {Error} The ID number is not valid. The birthday module cannot be used without passing the validation test.
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
     * @description This can be used to get the ID card holder's year of birth.
     * @throws {TypeError} Unexpected result. method or function response is not valid. Please re-check your code and data. - If an inconsistent result is output.
     * @returns {int} Birth year of ID card holder.
     * @readonly
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
     * @description The date of birth of the ID card holder and the number of days from the first day of January in the year of his birth.
     * @throws {TypeError} Unexpected result. method or function response is not valid. Please re-check your code and data. - If an inconsistent result is output.
     * @returns {int} The total number of days between the birth year of the ID card holder and the date of birth on January 1.
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
     * @description Output the month of birth of the ID card holder.
     * @returns {int} Birth month.
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
     * @description Output the month name of birth of the ID card holder.
     * @returns {string} Birth month name.
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
     * @description Output the day of birth of the ID card holder.
     * @returns {int} Birth day.
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
     * @description Name suitable for the day of birthday. eg:- Sunday, Monday
     * @returns {string} Day name.
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
     * @description This is used to find birthdays. When creating an object using BirthDay(), the national identity card number must be entered. If this is not provided, an object can be created, and the national identity card number can be entered using "setIdentityNumber(nationalIdentityCardNumber)". Any national ID number applied must be pre-verified.
     * Exceptions can be avoided if necessary. 
     * @param {string} [nationalIdentityCardNumber] - National identity card number Sri Lanka (Optional)
     * @param {boolean} [exceptionSwitch=true] - Designer-defined exceptions can be disabled.
     * @throws {TypeError} The parameter datatype does not match. A datatype of boolean is expected.
     * @throws {Error} The ID number is not valid. The birthday module cannot be used without passing the validation test.
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