import {BirthDay} from 'lknic';
import { realNic, monthNames as mn, fakeNicForDayRangeTest} from '../../../../testData';
import exception from '../../../../../src/modules/validationModule/exceptions/exception';

const real_nic = realNic();
const monthNames = mn();
const fake_nic = fakeNicForDayRangeTest();

describe('Test identity, calculate birthday: id-001 , Module: birthday', () => {

    test("validate code on 'birthday'. Method: birthYear()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const birthYear = dataSeparate[3];

            const response = new BirthDay(nicNumber).getBirthYear();
            expect(response).toBe(parseInt(birthYear,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: getDays()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const days = dataSeparate[4];

            const response = new BirthDay(nicNumber).getDays();
            expect(response).toBe(parseInt(days,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: getMonth()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const month = dataSeparate[5];

            const response = new BirthDay(nicNumber).getMonth();
            expect(response).toBe(parseInt(month,10));
            expect(response).not.toBe(false);
        }
    });


    test("validate code on 'birthday'. Method: getMonthName()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const month = dataSeparate[5];
            
            const response = new BirthDay(nicNumber).getMonthName();
            expect(response).toBe(monthNames[parseInt(month,10)]);
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: getDay()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayofweek = dataSeparate[6];         
            const response = new BirthDay(nicNumber).getDay();
            expect(response).toBe(parseInt(dayofweek,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: getDayName()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayName = dataSeparate[7];

            const response = new BirthDay(nicNumber).getDayName();
            expect(response).toBe(dayName);
            expect(response).not.toBe(false);
            
        }
    });

    test("validate code on 'birthday'. setter: identityNumber()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayName = dataSeparate[7];  
                expect(() => new BirthDay().identityNumber = nicNumber).not.toThrow();       
        }

        for (let index = 0; index < fake_nic.length; index++) {
            
            const dataSeparate = fake_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayName = dataSeparate[7];
                expect(() => new BirthDay().identityNumber = nicNumber).toThrow();      
        }
    });


    test("validate code on 'birthday'. constructor: constructor()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayName = dataSeparate[7];  
                expect(() => new BirthDay(nicNumber)).not.toThrow();
                expect(() => new BirthDay()).not.toThrow();
                expect(() => new BirthDay(undefined,false)).not.toThrow();
                expect(() => new BirthDay(undefined, true)).not.toThrow();
                expect(() => new BirthDay(nicNumber, false)).not.toThrow();
                expect(() => new BirthDay(nicNumber, true)).not.toThrow();
        }

        for (let index = 0; index < fake_nic.length; index++) {
            
            const dataSeparate = fake_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayName = dataSeparate[7];
                expect(() => new BirthDay().identityNumber = nicNumber).toThrow();
                expect(() => new BirthDay(nicNumber)).toThrow(); 
                expect(() => new BirthDay(1234)).toThrow();
                expect(() => new BirthDay(1.0145)).toThrow(); 
                expect(() => new BirthDay(true)).toThrow();
                expect(() => new BirthDay(false)).toThrow();
                //expect(() => new BirthDay(undefined, "123")).toThrow();   
                //expect(() => new BirthDay(undefined, "123")).toThrow();   
                //expect(() => new BirthDay(undefined, 12.45)).toThrow();        
        }
    });



});
