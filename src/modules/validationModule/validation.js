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
     * @description This method checks whether the provided National ID number is invalid by performing a series of validation tests.
     * It returns `true` if one or more of the validation checks fail, indicating that the ID is invalid. 
     * If all validation tests pass, the method returns `false`, meaning the ID is valid. The validation includes checks for
     * length, valid characters, presence of "V/X" in first-generation IDs, and the encoded date of birth.
     * The National ID number must be provided as a string, and any other data type will trigger an exception.
     *
     * @param {string} nicNumber - The National ID number to be validated.
     * @returns {boolean} - Returns `true` if the ID is invalid, and `false` if it is valid.
     * @throws {TypeError} NIC number cannot be undefined and must be of type string.
     * @throws {TypeError} National ID number must be of type 'string' and cannot be undefined.
     * @example
     * let nic = new Validate().isInvalidNIC("your national-identity-card number");
     * if (nic) {
     *     console.log("Invalid");
     * } else {
     *     console.log("Valid");
     * }
     * 
     * @date 2024/06/03
     */
    isInvalidNIC(nicNumber){
        this.#exceptionTest(nicNumber);
        return (!this.isValidNIC(nicNumber));
    }

    /**
     * @method invalidsCount
     * @description This method performs all validation checks on the provided National ID number and returns the number of failed validations. 
     * It validates the ID based on several criteria, including length, valid characters, the presence of "V/X" in first-generation IDs, 
     * and the encoded date of birth. For each failed validation, the count is incremented, providing a total number of issues found in the ID number.
     * If all validations pass, the method returns `0`, indicating that the ID is valid.
     * The National ID number must be supplied as a string, and any other data type will result in an exception.
     * 
     * @param {string} nicNumber - The National ID number to be validated.
     * @returns {int} - The total number of failed validation checks. Returns `0` if the ID passes all checks.
     * @throws {TypeError} NIC number cannot be undefined and must be of type string.
     * @throws {TypeError} National ID number must be of type 'string' and cannot be undefined.
     * @example
     * let count = new Validate().invalidsCount("your national-identity-card number");
     * console.log(count); // Outputs the number of failed validation checks
     * 
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
     * @description This method checks whether the length of the provided National ID number is valid according to predefined standards.
     * It returns `true` if the length of the ID number meets the required criteria, and `false` if it is too short or too long.
     * The length is an essential factor in determining the validity of the ID, as both first-generation and second-generation IDs have specific length requirements.
     * The National ID number must be provided as a string, and any other data type will trigger an exception.
     * @throws {TypeError} NIC number cannot be undefined and must be of type string.
     * @throws {TypeError} National ID number must be of type 'string' and cannot be undefined.
     * @param {string} nicNumber - The National ID number whose length is being validated.
     * @returns {boolean} - Returns `true` if the length of the ID is valid, `false` if it is invalid.
     * 
     * @example
     * let nic = new Validate().isValidLength("your national-identity-card number");
     * if (nic) {
     *     console.log("Valid length");
     * } else {
     *     console.log("Invalid length");
     * }
     * 
     * @date 2024/06/03
     */
    isValidLength(nicNumber){

        this.#exceptionTest(nicNumber);
        this.isValidNIC(nicNumber);
        return this.#isValidLength;
    }
    
    /**
     * @method isValidCharacters
     * @description 
     * This method validates the characters used in the provided National ID number to ensure that only allowed 
     * characters are present. It checks if the ID consists of valid characters according to predefined rules 
     * and standards, such as only allowing numeric characters and specific letters like 'V' or 'X' for 
     * first-generation IDs. This ensures that the format of the ID is correct and no invalid characters are used.
     * 
     * The method returns `true` if all characters in the ID number are valid, and `false` if one or more invalid 
     * characters are detected. Invalid characters could include special symbols, letters not allowed by the 
     * format, or any other characters that do not conform to the expected pattern.
     * 
     * This validation is part of the overall validation process to ensure that the ID number is formatted 
     * according to the rules for either first-generation or second-generation IDs.
     * 
     * @param {string} nicNumber - The National ID number to be validated. It must be a string representing 
     * the ID number.
     * @returns {boolean} - Returns `true` if the characters in the National ID number are valid, and `false` 
     * if any invalid characters are present.
     * 
     * @throws {TypeError} Throws an error if the NIC number is undefined or not of type 'string'. The method 
     * expects a valid string input for the validation process.
     * 
     * @example
     * let validate = new Validate();
     * let isValid = validate.isValidCharacters("your national-identity-card number");
     * 
     * if (isValid) {
     *     console.log("Valid characters");
     * } else {
     *     console.log("Invalid characters");
     * }
     * 
     * @date 2024/06/03
     */
    isValidCharacters(nicNumber){
        this.#exceptionTest(nicNumber);
        this.isValidNIC(nicNumber);
        return this.#isValidChars;
    }
    
    /**
     * @method isValidVXInOldGenAndNotInNewGen
     * @description 
     * This method validates whether a first-generation National ID contains the required "V" or "X" character. 
     * First-generation IDs are expected to end with either "V" or "X" to be considered valid. If a first-generation 
     * ID lacks these characters, the method returns `false`, marking the ID as invalid.
     * 
     * For second-generation IDs, which do not require "V" or "X", the method will return `true` regardless of 
     * whether these characters are present. This distinction ensures that the ID validation adheres to the rules 
     * specific to each generation of IDs.
     * 
     * This method is essential for ensuring that the National ID conforms to the correct format based on its generation, 
     * as first-generation IDs have a specific pattern requirement that differs from second-generation IDs.
     * 
     * @param {string} nicNumber - The National ID number to be validated. The input must be a string representing 
     * either a first- or second-generation ID.
     * @returns {boolean} - Returns `true` if the ID contains a valid "V" or "X" for first-generation IDs, or if it 
     * is a second-generation ID. Returns `false` if the ID does not conform to the required format for first-generation IDs.
     * 
     * @throws {TypeError} Throws an error if the NIC number is undefined or not of type 'string'. The method expects 
     * a valid string input for the validation process.
     * 
     * @example
     * let validate = new Validate();
     * 
     * // First-generation ID example (valid)
     * let isValidFirstGen = validate.isValidVXInOldGenAndNotInNewGen("old generation NIC");
     * if (isValidFirstGen) {
     *     console.log("Valid first-generation ID");
     * } else {
     *     console.log("Invalid first-generation ID");
     * }
     * 
     * // Second-generation ID example (valid, no V or X required)
     * let isValidSecondGen = validate.isValidVXInOldGenAndNotInNewGen("New Generation NIC");
     * if (isValidSecondGen) {
     *     console.log("Valid second-generation ID");
     * } else {
     *     console.log("Invalid second-generation ID");
     * }
     * 
     * @date 2024/06/03
     */

    isValidVXInOldGenAndNotInNewGen(nic){
        this.#exceptionTest(nicNumber);
        this.isValidNIC(nicNumber);
        return this.#isVXValid;
    }
    
    /**
     * @method isValidDayRange
     * @description 
     * This method checks whether the encoded date of birth (DOB) within the National ID number falls within 
     * a valid day range. The National ID typically encodes the day of the year (DOY), represented as a number 
     * between 1 and 365 for regular years or between 1 and 366 for leap years. This method ensures that the day 
     * portion of the ID is valid according to the calendar year.
     * 
     * The encoded DOY in the ID is typically based on the birth year and gender of the individual. The method 
     * verifies that the day falls within the acceptable range based on the encoding rules used in the ID.
     * 
     * If the encoded date of birth is correct, the method returns `true`, indicating that the DOB is valid. If 
     * the day is outside the valid range or does not conform to the expected format, the method returns `false`, 
     * marking the ID as invalid.
     * 
     * @param {string} nicNumber - The National ID number to be validated. The ID must contain an encoded 
     * date of birth in the correct format.
     * @returns {boolean} - Returns `true` if the encoded date of birth is valid, `false` if the encoded date 
     * is incorrect or outside the valid range.
     * 
     * @throws {TypeError} Throws an error if the NIC number is undefined or not of type 'string'. The method 
     * expects a valid string input for the validation process.
     * 
     * @example
     * let validate = new Validate();
     * 
     * let isValidDOB = validate.isValidDayRange("your national-identity-card number");
     * if (isValidDOB) {
     *     console.log("Valid date of birth");
     * } else {
     *     console.log("Invalid date of birth");
     * }
     * 
     * @date 2024/06/03
     */

    isValidDayRange(nicNumber){
        this.#exceptionTest(nicNumber);
        this.isValidNIC(nicNumber);
        return this.#isValidDayRange;
    }

    /**
     * @constructor
     * @description 
     * The constructor for the `Validate` class creates an instance of the validation utility, 
     * allowing the user to validate various aspects of a National ID number. By default, the 
     * constructor enables exception handling, which will throw errors when invalid data 
     * (e.g., an undefined or non-string National ID number) is passed to any validation methods.
     * 
     * However, the user can disable this exception handling by passing `false` to the `exceptionSwitch` 
     * parameter. When exception handling is disabled, the class will silently fail without throwing 
     * errors, allowing for more flexible error management. This is particularly useful in scenarios 
     * where you want to manage validation failures without halting the program.
     * 
     * @param {boolean} [exceptionSwitch=true] - Determines whether exceptions should be thrown. 
     * Set to `false` to suppress exceptions. Defaults to `true` (exceptions enabled).
     * 
     * @example
     * // Create a Validate instance with exception handling enabled (default behavior)
     * let validateWithExceptions = new Validate();
     * 
     * // Create a Validate instance with exception handling disabled
     * let validateWithoutExceptions = new Validate(false);
     * 
     * @date 2024/06/03
     */

    constructor(exceptionSwitch=true){
        super();
        this._exceptionSwitch = exceptionSwitch;
    }
}

export default Validate;