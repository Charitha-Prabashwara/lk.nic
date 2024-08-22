class exception{
    #msgMethodParamUndefined = "datatype undefined parameter. You can only use string data type."
    _exceptionSwitch;

    _exceptionMethodParamUndefined(msg){
        
        if(this._exceptionSwitch){
            
            if(typeof(msg) === 'undefined'){throw new Error(this.#msgMethodParamUndefined);}
            if(typeof(msg) === 'string'){throw new Error(msg);}
            if(!(typeof(msg) === 'undefined' | typeof(msg) === 'string')){
                throw new TypeError("The parameter datatype does not match. A datatype of string or undefined is expected.");
            }
        }
    }
}
export default exception;