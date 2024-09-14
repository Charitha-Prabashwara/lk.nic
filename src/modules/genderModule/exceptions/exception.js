class exception{
    #msgInvalidNic = "The ID number is not valid. The gender module cannot be used without passing the validation test.";
    #msgExceptionSwitch = "The parameter datatype does not match. A datatype of boolean is expected."
    #unexpectedResult = "An unexpected result has been obtained. Check again.";
    _exceptionSwitch;
    
    _exceptionInvalidNic(msg){
       
        if(this._exceptionSwitch){
            
            if(typeof(msg) === 'undefined'){throw new Error(this.#msgInvalidNic);}
            if(typeof(msg) === 'string'){throw new Error(msg);}
            if(!(typeof(msg) === 'undefined' | typeof(msg) === 'string')){
                throw new TypeError("The parameter datatype does not match. A datatype of string or undefined is expected.");
            }
        }
    }
    
    _exceptionSwitchTypeError(msg){

        if(this._exceptionSwitch){

            if(typeof(msg) === 'undefined'){throw new TypeError(this.#msgExceptionSwitch);}
            if(typeof(msg) === 'string'){throw new Error(msg);}
            if(!(typeof(msg) === 'undefined' | typeof(msg) === 'string')){
                throw new TypeError("The parameter datatype does not match. A datatype of string or undefined is expected.");
            }
        }  
    }

    _exceptionUnexpectedResult(msg){
        
        if(this._exceptionSwitch){

            if(typeof(msg) === 'undefined'){throw new Error(this.#unexpectedResult);}
            if(typeof(msg) === 'string'){throw new Error(msg);}
            if(!(typeof(msg) === 'undefined' | typeof(msg) === 'string')){
                throw new TypeError("The parameter datatype does not match. A datatype of string or undefined is expected.");
            }
        }  
    }

    
}

export default exception;