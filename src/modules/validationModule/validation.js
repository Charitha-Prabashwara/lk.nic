import lengthValidator from './lengthValidator.js';
import ValidChars from './notInvalidChars.js';
import vxCheck from './v-and-xCheck.js';
import DayRange from './dayRange.js';

class Validate{
    #isValidLength;
    #isValidChars;
    #isVXValid;
    #isValidDayRange;

    isValidNIC(nicNumber){
        this.#isValidLength = lengthValidator(nicNumber);
        this.#isValidChars  = ValidChars(nicNumber);
        this.#isVXValid     = new vxCheck(nicNumber).isValid();
        this.#isValidDayRange = new DayRange().isValidDayRangeFromNIC(nicNumber);

        return (this.#isValidLength && this.#isValidChars && this.#isVXValid && this.#isValidDayRange);
    }

    isInvalidNIC(nicNumber){
        return (!this.isValidNIC(nicNumber));
    }

    invalidsCount(nicNumber){
        this.isValidNIC(nicNumber);
        let count = 0;

        if(!this.#isValidLength){++count;}
        if(!this.#isValidChars){++count;}
        if(!this.#isVXValid){++count;}
        if(!this.#isValidDayRange){++count;}

        return count;
    }

    isValidLength(nicNumber){
        this.isValidNIC(nicNumber);
        return this.#isValidLength;
    }
    isValidCharacters(nicNumber){
        this.isValidNIC(nicNumber);
        return this.#isValidChars;
    }
    isValidVXInOldGenAndNotInNewGen(nic){
        this.isValidNIC(nicNumber);
        return this.#isVXValid;
    }

    isValidDayRange(nicNumber){
        this.isValidNIC(nicNumber);
        return this.#isValidDayRange;
    }
}

export default Validate;