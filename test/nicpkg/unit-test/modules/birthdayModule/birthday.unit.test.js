import {BirthDay} from 'lknic';
import { realNic, monthNames as mn } from '../../../../testData';

const real_nic = realNic();
const monthNames = mn();

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

    test("validate code on 'birthday'. Method: days()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const days = dataSeparate[4];

            const response = new BirthDay(nicNumber).getDays();
            expect(response).toBe(parseInt(days,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: month()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const month = dataSeparate[5];

            const response = new BirthDay(nicNumber).getMonth();
            expect(response).toBe(parseInt(month,10));
            expect(response).not.toBe(false);
        }
    });


    test("validate code on 'birthday'. Method: monthName()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const month = dataSeparate[5];
            
            const response = new BirthDay(nicNumber).getMonthName();
            expect(response).toBe(monthNames[parseInt(month,10)]);
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: day()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayofweek = dataSeparate[6];         
            const response = new BirthDay(nicNumber).getDay();
            expect(response).toBe(parseInt(dayofweek,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: dayName()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayName = dataSeparate[7];

            const response = new BirthDay(nicNumber).getDayName();
            expect(response).toBe(dayName);
            expect(response).not.toBe(false);
            
        }
    });


});
