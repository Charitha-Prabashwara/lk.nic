import { Gender } from 'lknic';
import { realNic } from '../../../../testData';

const real_nic = realNic();

describe('Test identity, calculate gender: id-001 , Module: gender', () => {

    test("validate code on 'birthday'. Method: genderRoStr()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const gender = dataSeparate[8];

            const response = new Gender(nicNumber).genderToStr;
            expect(response).toBe(gender);
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: genderRoInt()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            let gender = dataSeparate[8];

            const response = new Gender(nicNumber).genderToInt;
            if(gender == "male"){gender = 1;}
            if(gender == "female"){gender = 2;}
            expect(response).toBe(gender);
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: isMale()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            let gender = dataSeparate[8];

            const response = new Gender(nicNumber).isMale;
            if(gender == "male"){gender = true;}
            if(gender == "female"){gender = false;}
            expect(response).toBe(gender);
        }
    });

    test("validate code on 'birthday'. Method: isFemale()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            let gender = dataSeparate[8];

            const response = new Gender(nicNumber).isFemale;
            if(gender == "male"){gender = false;}
            if(gender == "female"){gender = true;}
            expect(response).toBe(gender);
        }
    });


});

