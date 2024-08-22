import vxCheck from '../validationModule/v-and-xCheck.js';
import Validate from "../validationModule/validation.js"
import exception from './exceptions/exception.js';


/**
 * @module Generation
 * @description Using "Generation", what is the generation of the Sri Lanka National ID number?
 * Can be identified. Generation can only be identified in valid ID numbers.
 * @author Charitha Prabhashwara
 * @email prabhashwara.seu@gmail.com
 * @date 2024/06/03
 */
class Generation extends exception{

    /**
     * @method determiningTheGenerationFromChar
     * @description When coming from first-generation IDs to second-generation,
     * the last letter "V/X" used to determine whether the first-generation ID
     * is eligible to vote or not can be used to identify the generation.
     * Generation 1 as 1 and Generation 2 as 2. Also returns "false" if the validation test fails.
     * @param {String} nationalIdentityCardNumber
     * @returns {false | 1 | 2}
     * @date 2024/06/03
     */
    #determiningTheGenerationFromChar(nationalIdentityCardNumber){
        
        const isOldGen = new vxCheck(nationalIdentityCardNumber).isOldGeneration();
        const isNewGen = new vxCheck(nationalIdentityCardNumber).isNewGeneration();     
        if(isOldGen){return 1;}
        if(isNewGen){return 2;}    
    }
    /**
     * @method determiningTheGenerationFromLength
     * @description The increase in the number of characters in the ID number from the first
     * generation to the second generation is used to identify the generation.
     * Generation 1 as 1 and Generation 2 as 2. Also returns "false" if the validation test fails.
     * @param {String} nationalIdentityCardNumber
     * @returns {false | 1 | 2}
     * @date 2024/06/03
     */
    #determiningTheGenerationFromLength(nationalIdentityCardNumber){

        const oldGen = nationalIdentityCardNumber.length == 10;
        const newGen = nationalIdentityCardNumber.length == 12;

        if(oldGen && !newGen){
            return 1;
        }else if(!oldGen && newGen){
            return 2;
        }
    }

    /**
     * @method witchGeneration
     * @description From the first generation to the second generation,
     * the removal of the characters "V/X" and the increase in the number
     * of characters are both used to determine the generation of the National ID number.
     * Generation 1 as "1" and Generation 2 as "2". Also returns "false" if the validation test fails.
     * @param {String} nationalIdentityCardNumber
     * @returns {false | "1" | "2"}
     * @date 2024/06/03
     */
    witchGeneration(nationalIdentityCardNumber){
        
        if(!(new Validate().isValidNIC(nationalIdentityCardNumber))){
            this._exceptionInvalidNic();
        }

        const characterGeneration =  this.#determiningTheGenerationFromChar(nationalIdentityCardNumber);
        const lengthGeneration = this.#determiningTheGenerationFromLength(nationalIdentityCardNumber);
        

        if((characterGeneration == 1) && (lengthGeneration == 1)){
            return '1';
        }else if((characterGeneration == 2) && (lengthGeneration == 2)){
            return '2';
        }
    }

    constructor(exceptionSwitch=true){
        super();
        if(!(typeof(exceptionSwitch) === 'boolean')){this._exceptionSwitchTypeError();}
        else{this._exceptionSwitch = exceptionSwitch;}
    }

}

export default Generation;
