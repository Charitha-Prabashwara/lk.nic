import lengthValidator from './lengthValidator.js';
import ValidChars from './notInvalidChars.js';
import vxCheck from './v-and-xCheck.js';
import DayRange from './dayRange.js';
import exception from './exceptions/exception.js'

/**
 * @module Validate
 * @description 
 * The Validate class is a specialized utility that ensures the correctness of national ID numbers by 
 * conducting multiple validation checks. It assesses whether the ID has the appropriate length, cont
 * ains valid characters, includes the correct "V" or "X" designation for first-generation IDs, and v
 * erifies the accuracy of the encoded date of birth. These validations ensure that the ID conforms t
 * o the expected format and standards. Each check is performed through dedicated methods, such as is
 * ValidLength for checking length, isValidCharacters for ensuring only allowed characters are used, 
 * and isValidDayRange for verifying the date of birth.

 * A core function of the class is the isValidNIC method, which aggregates all the validation checks and 
 * returns a boolean indicating whether the ID is valid. If the ID passes all tests, the method returns 
 * true; otherwise, it returns false. For a more granular analysis, the invalidsCount method provides th
 * e number of failed checks, giving insight into where the errors occur in the ID. This functionality a
 * llows the class to act as a comprehensive validator, ensuring that each part of the ID is thoroughly 
 * examined before determining its validity.

 * The Validate class also offers individual methods for focused validation. For example, isValidLength 
 * checks whether the ID conforms to the expected length, while isValidCharacters determines if only va
 * lid characters are used. The isValidVXInOldGenAndNotInNewGen method checks if first-generation IDs c
 * ontain the "V" or "X" characters, which are required for those IDs but not for second-generation IDs. 
 * This flexibility allows developers to validate specific aspects of the ID when needed, making the cla
 * ss both versatile and detailed.

 * An important aspect of the Validate class is its handling of exceptions. It extends from an exception 
 * class, which allows it to manage cases where invalid parameters are passed, such as when the ID numbe
 * r is undefined or not in the correct string format. The #exceptionTest private method checks for thes
 * e scenarios, ensuring that invalid input is caught early, preventing further errors. This robust erro
 * r-handling mechanism makes the class reliable in diverse use cases where data may not always be in th
 * e expected form.

 * The class constructor includes an optional exceptionSwitch parameter, which gives users control over 
 * whether exceptions are enabled or disabled. By default, exceptions are enabled, but developers can s
 * et this to false if they prefer to handle errors differently. This flexibility ensures that the Vali
 * date class can be used in various contexts, providing strong validation capabilities and control over
 * how exceptions are managed. Overall, the class is designed to be a complete and user-friendly solutio
 * n for National ID validation.
 * 
 * @author Charitha Prabhashwara
 * @email prabhashwara.seu@gmail.com
 * @date 2024/06/03 
 */
class Validate extends exception{

    #isValidLength;
    #isValidChars;
    #isVXValid;
    #isValidDayRange;

    #exceptionTest(nicNumber){
        if(typeof(nicNumber) === 'undefined'){
            this._exceptionMethodParamUndefined();
        }else{
            if(!(typeof(nicNumber) === 'string')){
                this._exceptionNicParameterTypeError();
            }
        }

    }

    /**
     * @method isValidNIC
     * @description 
     * This method performs a comprehensive validation of the provided National ID number 
     * by checking its length, character validity, the presence of "V/X" for first-genera
     * tion IDs, and the correctness of the encoded date of birth. If all checks pass, th
     * e method returns true, indicating the ID is valid. If any check fails, it returns 
     * false
     * @param {string} nicNumber - The National ID number to be checked.
     * @returns {boolean} (boolean): true if the date of birth is correctly encoded, false if there is an error.
     * @throws {TypeError} NIC number cannot be undefined and must be of type string.
     * @throws {TypeError} National ID number must be of type 'string' and cannot be undefined.
     * @example
     * let nic= new Validate().isValidNIC("your national-identity-card number");
     * if(nic){
     *      console.log("valid");
     * }else{
     *      console.log("invalid");
     * }
     * @date 2024/06/03
     */
    isValidNIC(nicNumber){
        
        this.#exceptionTest(nicNumber);

       

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
     * @example
     * let nic= Validate().isInvalidNIC("your national-identity-card number");
     * if(nic){
     *      console.log("Invalid");
     * }else{
     *      console.log("valid");
     * }
     * @date 2024/06/03
     */
    isInvalidNIC(nicNumber){
        this.#exceptionTest(nicNumber);
        return (!this.isValidNIC(nicNumber));
    }

    /**
     * @method invalidsCount
     * @description Performs all validation checks and outputs how many validation checks have failed.
     * @param {string} nicNumber 
     * @returns {int}
     * @example
     * let count= Validate().invalidsCount("your national-identity-card number");
     * console.log(count)
     * @date 2024/06/03
     */
    invalidsCount(nicNumber){
        this.#exceptionTest(nicNumber);

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
     * @example
     * let nic= Validate().isValidLength("your national-identity-card number");
     * if(nic){
     *      console.log("valid length");
     * }else{
     *      console.log("invalid length");
     * }
     * @date 2024/06/03
     */
    isValidLength(nicNumber){

        this.#exceptionTest(nicNumber);
        this.isValidNIC(nicNumber);
        return this.#isValidLength;
    }
    
    /**
     * @method isValidCharacters
     * @description The characters of the ID number entered by the user are valid or not (boolean).
     * Returns true if the characters in the ID number are valid, returns false if they are invalid.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @example
     * let nic= Validate().isValidCharacters("your national-identity-card number");
     * if(nic){
     *      console.log("valid");
     * }else{
     *      console.log("invalid");
     * }
     * @date 2024/06/03
     */
    isValidCharacters(nicNumber){
        this.#exceptionTest(nicNumber);
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
     * @example
     * let nic= Validate().isValidVXInOldGenAndNotInNewGen("your national-identity-card number");
     * if(nic){
     *      console.log("valid");
     * }else{
     *      console.log("invalid");
     * }
     * @date 2024/06/03
     */
    isValidVXInOldGenAndNotInNewGen(nic){
        this.#exceptionTest(nicNumber);
        this.isValidNIC(nicNumber);
        return this.#isVXValid;
    }
    
    /**
     * @method isValidVXInOldGenAndNotInNewGen
     * @description Returns false if the encoded date of birth is incorrect,
     * returns true if the date of birth is correct.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @example
     * let nic= Validate().isValidDayRange("your national-identity-card number");
     * if(nic){
     *      console.log("valid");
     * }else{
     *      console.log("invalid");
     * }
     * @date 2024/06/03
     */
    isValidDayRange(nicNumber){
        this.#exceptionTest(nicNumber);
        this.isValidNIC(nicNumber);
        return this.#isValidDayRange;
    }

    /**
     * @constructor
     * @description If you want to block exceptions from creating a Validate instance, you can use exceptionSwitch.
     * @param {boolean} [exceptionSwitch=true] - Exceptions can be blocked by giving false.
     */
    constructor(exceptionSwitch=true){
        super();
        this._exceptionSwitch = exceptionSwitch;
    }
}

export default Validate;