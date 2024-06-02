import lengthValidator from './lengthValidator.js';
import ValidChars from './notInvalidChars.js';
import vxCheck from './v-and-xCheck.js';
import DayRange from './dayRange.js';

/**
 * @module Validate
 * @description This module checks the validity of National ID numbers.
 * The characters of the ID number entered by the user are valid or not (boolean),
 * and the length of the entered ID number is valid or not (boolean).
 * Is the "V/X"  of the first generation of ID cards entered or not (boolean).
 * There is an error in the encoded date of birth. ID number with no errors?(boolean),
 * number of errors present(int)
 * @author Charitha Prabhashwara
 * @email prabhashwara.seu@gmail.com
 * @date 2024/06/03
 */
class Validate{

    #isValidLength;
    #isValidChars;
    #isVXValid;
    #isValidDayRange;

    /**
     * @method isInvalidNIC
     * @description Returns true if all validation tests are done,
     * returns false if one or more of the validation tests are incorrect.
     * The National ID number should be given in string datatype.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @date 2024/06/03
     */
    isValidNIC(nicNumber){
        this.#isValidLength = lengthValidator(nicNumber);
        this.#isValidChars  = ValidChars(nicNumber);
        this.#isVXValid     = new vxCheck(nicNumber).isValid();
        this.#isValidDayRange = new DayRange().isValidDayRangeFromNIC(nicNumber);

        return (this.#isValidLength && this.#isValidChars && this.#isVXValid && this.#isValidDayRange);
    }

    /**
     * @method isInvalidNIC
     * @description Returns true if all validation false are done,
     * returns true if one or more of the validation tests are incorrect.
     * The National ID number should be given in string datatype.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @date 2024/06/03
     */
    isInvalidNIC(nicNumber){
        return (!this.isValidNIC(nicNumber));
    }

    /**
     * @method invalidsCount
     * @description Performs all validation checks and outputs how many validation checks have failed.
     * @param {string} nicNumber 
     * @returns {int}
     * @date 2024/06/03
     */
    invalidsCount(nicNumber){
        this.isValidNIC(nicNumber);
        let count = 0;

        if(!this.#isValidLength){++count;}
        if(!this.#isValidChars){++count;}
        if(!this.#isVXValid){++count;}
        if(!this.#isValidDayRange){++count;}

        return count;
    }

    /**
     * @method isValidLength
     * @description Length of the entered ID number is valid or not (boolean).
     * Returns true if the length is valid, false if the length is invalid.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @date 2024/06/03
     */
    isValidLength(nicNumber){
        this.isValidNIC(nicNumber);
        return this.#isValidLength;
    }
    
    /**
     * @method isValidCharacters
     * @description The characters of the ID number entered by the user are valid or not (boolean).
     * Returns true if the characters in the ID number are valid, returns false if they are invalid.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @date 2024/06/03
     */
    isValidCharacters(nicNumber){
        this.isValidNIC(nicNumber);
        return this.#isValidChars;
    }
    /**
     * @method isValidVXInOldGenAndNotInNewGen
     * @description First-generation ID numbers include the "V" or "X" character,
     * otherwise, it is treated as an invalid ID number,
     * and false is returned otherwise true is returned.
     * This does not apply to second-generation ID numbers but can be used if you enter a second-generation ID number,
     * it will return true.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @date 2024/06/03
     */
    isValidVXInOldGenAndNotInNewGen(nic){
        this.isValidNIC(nicNumber);
        return this.#isVXValid;
    }
    /**
     * @method isValidVXInOldGenAndNotInNewGen
     * @description Returns false if the encoded date of birth is incorrect,
     * returns true if the date of birth is correct.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @date 2024/06/03
     */
    isValidDayRange(nicNumber){
        this.isValidNIC(nicNumber);
        return this.#isValidDayRange;
    }
}

export default Validate;