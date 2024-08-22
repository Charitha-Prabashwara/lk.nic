
import Generation from '../../modules/generationModule/whichGeneration.js';
import Validate from '../validationModule/validation.js';
import exception from './exceptions/exception.js';

class BirthDay extends exception{
    
    #nationalIdentityCardNumber;
    #generation;
   
    
    set setIdentityNumber(nationalIdentityCardNumber){
        //write unit-test -not yet 
        if(!new Validate().isValidNIC(nationalIdentityCardNumber)){
            this._exceptionInvalidNic();//exception
        }else{
            this.#nationalIdentityCardNumber = nationalIdentityCardNumber;
        }
    }

    nicGeneration(nationalIdentityCardNumber){
        const generation = new Generation();
        let generationResult;
        
        if(typeof(nationalIdentityCardNumber) == 'undefined'){
            generationResult = generation.witchGeneration(this.#nationalIdentityCardNumber);
        }
        else{
            
            if(!typeof(nationalIdentityCardNumber) == 'string'){
                this._exceptionNicParameterTypeError();//exception
            }else{
                generationResult = generation.witchGeneration(nationalIdentityCardNumber)
            }
        }
       
        this.#generation = generationResult;
        return generationResult;
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
        const generationResult = this.nicGeneration();
        
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

        const generationResult = this.nicGeneration();
        
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