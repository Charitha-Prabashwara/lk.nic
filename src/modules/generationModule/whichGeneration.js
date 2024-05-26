const lengthValidator = require('../validationModule/lengthValidator');
const validChar = require('../validationModule/notInvalidChars')
const vxCheck = require('../validationModule/v-and-xCheck');

//import {InvalidLengthException, invalidCharacterException} from './exceptions/exceptions';


class Generation{
    #isLengthValid(nic){return lengthValidator.lengthValidator(nic);}
    #isValidChar(nic){return validChar.ValidChars(nic)} 
    #vxCheck(nic){return new vxCheck.vxCheck(nic).isValid();} 

    #determiningTheGenerationFromChar(nic){
        
        if(!this.#isLengthValid(nic)){return false;}
        if(!this.#isValidChar(nic)){return false;}

        if(this.#vxCheck(nic)){
            const isOldGen = new vxCheck.vxCheck(nic).isOldGeneration();
            const isNewGen = new vxCheck.vxCheck(nic).isNewGeneration();
            
            if(isOldGen){return "1";}
            if(isNewGen){return "2";}
        }else{return false;}
    }

    #determiningTheGenerationFromLength(nic){

        if(!this.#isLengthValid(nic)){return false;}
        if(!this.#isValidChar(nic)){return false;}

        if(this.#vxCheck(nic)){
            
           const oldGen = nic.length == 10;
           const newGen = nic.length == 12;

           if(oldGen && !newGen){
                return "1";
            }else if(!oldGen && newGen){
                return "2";
            }else{
                return false;
            }
        }else{return false;}

    }

    witchGeneration(nic){
        const gfc =  this.#determiningTheGenerationFromChar(nic);
        const gfcl = this.#determiningTheGenerationFromLength(nic);
        
        if((gfc == false) || (gfcl == false)){
            return false;
        }

        if((gfc == '1') && (gfcl == '1')){
            return '1';
        }else if((gfc == '2') && (gfcl == '2')){
            return '2';
        }else{
            return false;
        }
    }
}

module.exports = {Generation};
