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
     * Generation 1 as 1 and Generation 2 as 2.
     * @param {String} nationalIdentityCardNumber
     * @returns {1 | 2}
     * @date 2024/06/03
     */
    determiningTheGenerationFromChar(nationalIdentityCardNumber){
        const vxChecker = new vxCheck(nationalIdentityCardNumber);
        const isOldGen = vxChecker.isOldGeneration();
        const isNewGen = vxChecker.isNewGeneration();   

        if(isOldGen){return 1;}
        if(isNewGen){return 2;}   
        return null; 
    }
    
    /**
     * @method determiningTheGenerationFromLength
     * @description The increase in the number of characters in the ID number from the first
     * generation to the second generation is used to identify the generation.
     * Generation 1 as 1 and Generation 2 as 2.
     * @param {String} nationalIdentityCardNumber
     * @returns {1 | 2}
     * @date 2024/06/03
     */
    determiningTheGenerationFromLength(nationalIdentityCardNumber){

        const oldGen = nationalIdentityCardNumber.length == 10;
        const newGen = nationalIdentityCardNumber.length == 12;

        if(oldGen && !newGen){
            return 1;
        }else if(!oldGen && newGen){
            return 2;
        }
        return null; 
    }

    /**
     * @method witchGeneration
     * @description From the first generation to the second generation,
     * the removal of the characters "V/X" and the increase in the number
     * of characters are both used to determine the generation of the National ID number.
     * Generation 1 as "1" and Generation 2 as "2".
     * @param {String} nationalIdentityCardNumber
     * @returns {"1" | "2"}
     * @date 2024/06/03
     */
    whichGeneration(nationalIdentityCardNumber){
        const validation = new Validate();
        if(!(new validation.isValidNIC(nationalIdentityCardNumber))){
            this._exceptionInvalidNic();
        }

        const characterGeneration =  this.determiningTheGenerationFromChar(nationalIdentityCardNumber);
        const lengthGeneration = this.determiningTheGenerationFromLength(nationalIdentityCardNumber);
        
        return (characterGeneration === 1 && lengthGeneration === 1) ? '1' : (characterGeneration === 2 && lengthGeneration === 2) ? '2' : undefined;
    }

    /**
     * @constructor
     * @description National ID numbers identify which generation they belong to.
     * Exception handling can be controlled using "exceptionSwitch".
     * @param {boolean} [exceptionSwitch=true] - Exceptions can be blocked by giving false.
     * @throws {TypeError} The parameter datatype does not match. A datatype of boolean is expected. 
     */
    constructor(exceptionSwitch=true){
        super();
        this._exceptionSwitch = typeof(exceptionSwitch) === 'boolean' ? exceptionSwitch : this._exceptionSwitchTypeError();
    }

}

export default Generation;
