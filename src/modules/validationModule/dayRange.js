import vxCheckForOldGeneration from '../../support_func/checkForOldGenerationVX';
import vxCheckForNewGeneration from '../../support_func/checkForNewGenerationVX';

class DayRange{

    #isHYear(year){
        return (year % 4) == 0;
    }

    #isLYear(year){
        return (year % 4) != 0;
    }

    #generation(nicNumber){
        const isOldGenVX = vxCheckForOldGeneration(nicNumber);
        const isNewGenVX = vxCheckForNewGeneration(nicNumber);

        const isOldGenLen = nicNumber.length == 10;
        const isNewGenLen = nicNumber.length == 12;
        const isNotErrorGenLen = (nicNumber.length == 10 || nicNumber.length == 12);

        const resultOldGen = isNotErrorGenLen && isOldGenLen && isOldGenVX;
        const resultNewGen = isNotErrorGenLen && isNewGenLen && isNewGenVX;

        if(resultOldGen){
            return 1;
        }else if(resultNewGen){
            return 2;
        }else{
            false;
        }
    }

    #totalDaysOldGen(nicNumber){
        const result = nicNumber.slice(2, 5);
        return parseInt(result);
    }

    #totalDaysNewGen(nicNumber){
        const result = nicNumber.slice(4, 7);
        return parseInt(result);
    }

    #birthYearOldGen(nicNumber){
        const result = "19" + nicNumber.slice(0,2);
        return parseInt(result,10);
    }

    #birthYearNewGen(nicNumber){
        const result = nicNumber.slice(0,4);
        return parseInt(result,10);
    }

    #getDays(nicNumber, generation){
        if(generation == 1){
            return this.#totalDaysOldGen(nicNumber);
        }
        if(generation == 2){
            return this.#totalDaysNewGen(nicNumber);
        }
    }

    #getYear(nicNumber, generation){
        if(generation == 1){
            return this.#birthYearOldGen(nicNumber);
        }
        if(generation == 2){
            return this.#birthYearNewGen(nicNumber);
        }
    }

    isValidDayRangeFromEpoch(dayEpoch, year){

        if(this.#isHYear(year)){
            return (dayEpoch > 1 && dayEpoch <= 366);
        }
        if(this.#isLYear(year)){
            return (dayEpoch > 1 && dayEpoch <= 365);
        }
        return false;
    }

    isValidDayRangeFromNIC(nicNumber){
        const generation = this.#generation(nicNumber);
        if(!generation){return false;}

        const year = this.#getYear(nicNumber, generation);
        let days = this.#getDays(nicNumber, generation);
        
        if(days >= 500){
            days -= 500;
        }
        return this.isValidDayRangeFromEpoch(days, year);      
    }
}

export default DayRange;