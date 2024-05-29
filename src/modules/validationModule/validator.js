import lengthValidator from "./lengthValidator";
import ValidChars from "./notInvalidChars";
import vxCheck from "./v-and-xCheck";

class Validator{
    #nicNumber;

    
    constructor(nicNumber ='undefined'){ 
        if(!(typeof(nicNumber) === 'undefined')){
            this.#nicNumber = nicNumber;
            if(!this.isValidNIC){return false;}
        }
    }
}