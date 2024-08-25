
import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import exception from './exceptions/exception.js';

/**
 * 
 * @module BirthDay
 * @description This is used to find the date, month, and birth year in a National ID number.
 * @author Charitha Prabhashwara
 * @email prabhashwara.seu@gmail.com
 * @date 2024/06/05
 */
class BirthDay extends exception{
    
    #nationalIdentityCardNumber;
    #generation;
   
    
    /**
     * @method setIdentityNumber
     * @description This can be used to add a new national ID number to the birthday object.
     * It will be executed only if the validity test is passed and if an invalid ID number is entered,
     * the corresponding exception will be executed. In case of a new entry,
     * use 'exception handling techniques' or use the 'validation' module to enter with prior validation.
     * @param {string} nationalIdentityCardNumber - National identity card number Sri Lanka
     * @throws {Error} The ID number is not valid. The birthday module cannot be used without passing the validation test.
     */
    set setIdentityNumber(nationalIdentityCardNumber){
        //write unit-test -not yet 
        if(!new Validate().isValidNIC(nationalIdentityCardNumber)){

            this._exceptionInvalidNic();//exception
        }else{
            this.#nationalIdentityCardNumber = nationalIdentityCardNumber;
        }
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
        
        let year;
        const generationResult = new Generation().witchGeneration(this.#nationalIdentityCardNumber);
        
        if(generationResult == "1"){
            year = this.#birthYearOldGen;
        }else if(generationResult == "2"){
            year = this.#birthYearNewGen;
        }else{
            this._exceptionBirthYearDayUnexpectedResult();//exception
        }

        return year;
    }

    get days(){

        let days;

        const generationResult = new Generation().witchGeneration(this.#nationalIdentityCardNumber);
        
        if(generationResult == "1"){ days = this.#totalDaysOldGen;}
        else if(generationResult == "2"){days = this.#totalDaysNewGen;}
        else{this._exceptionBirthYearDayUnexpectedResult();}//exception

        if(days > 500){days -= 500;}
        return days;
    }

    get month(){
        const year = this.birthYear.toString();
        let days;
        
        if(parseInt(year) % 4 == 0){
            days = this.days-1;
        }else{
            days = this.days-2;
        }

        let date = new Date(year);
        date.setDate(date.getDate() + days);
        let result = parseInt(date.getMonth()+1);
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
        const year = this.birthYear.toString();
        let days;
        
        if(parseInt(year) % 4 == 0){
            days = this.days-1;
            
        }else{
            days = this.days-2;
        }

        let date = new Date(year);
        date.setDate(date.getDate() + days);
        let result = parseInt(date.getDate());
        return result;
    }

    get dayName(){
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const year = this.birthYear.toString();
        let days;
        
        if(parseInt(year) % 4 == 0){
            days = this.days-1;

        }else{
            days = this.days-2;
        }

        let date = new Date(year);
        date.setDate(date.getDate() + days);
        let result = weekDays[parseInt(date.getDay())];
        return result;
    
    }

    constructor(nationalIdentityCardNumber, exceptionSwitch = true){ 
        super();

        if(!(typeof(exceptionSwitch) === 'boolean')){
            this._exceptionSwitchTypeError();//exception
        }else{
            this._exceptionSwitch = exceptionSwitch;
        }
        
        if(!(typeof(nationalIdentityCardNumber) === 'undefined')){
            if(!new Validate().isValidNIC(nationalIdentityCardNumber)){this._exceptionInvalidNic()}//exception
            else{this.#nationalIdentityCardNumber = nationalIdentityCardNumber;}   
        }       
    }


    
}

export default BirthDay;