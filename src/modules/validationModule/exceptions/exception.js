class exception{
    #msgMethodParamUndefined = "NIC number cannot be undefined and must be of type string."
    #msgNicParameterTypeError="National ID number must be of type 'string' and cannot be undefined.";
    _exceptionSwitch;

    _exceptionMethodParamUndefined(msg){
        
        if(this._exceptionSwitch){
            
            if(typeof(msg) === 'undefined'){throw new TypeError(this.#msgMethodParamUndefined);}
            if(typeof(msg) === 'string'){throw new Error(msg);}
            if(!(typeof(msg) === 'undefined' | typeof(msg) === 'string')){
                throw new TypeError("The parameter datatype does not match. A datatype of string or undefined is expected.");
            }
        }
    }

    _exceptionNicParameterTypeError(msg){
        if(this._exceptionSwitch){

            if(typeof(msg) === 'undefined'){throw new TypeError(this.#msgNicParameterTypeError);}
            if(typeof(msg) === 'string'){throw new Error(msg);}
            if(!(typeof(msg) === 'undefined' | typeof(msg) === 'string')){
                throw new TypeError("The parameter datatype does not match. A datatype of string or undefined is expected.");
            }
        }  
    }
}
export default exception;