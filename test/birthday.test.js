const model = require('../src/birthday');
const testData = require('./testData');

real_nic = testData.real_nic;

describe('Test identity, calculate birthday: id-001 , Module: birthday', () => {

    test("validate code on 'birthday'. Method: birthYear()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const birthYear = dataSeparate[3];

            const response = new model.BirthDay(nicNumber).birthYear;
            expect(response).toBe(parseInt(birthYear,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: days()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const days = dataSeparate[4];

            const response = new model.BirthDay(nicNumber).days;
            expect(response).toBe(parseInt(days,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: month()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const month = dataSeparate[5];

            const response = new model.BirthDay(nicNumber).month;
            expect(response).toBe(parseInt(month,10));
            expect(response).not.toBe(false);
        }
    });


    test("validate code on 'birthday'. Method: monthName()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const month = dataSeparate[5];
            
            const response = new model.BirthDay(nicNumber).monthName;
            expect(response).toBe(monthNames[parseInt(month,10)]);
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: day()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayofweek = dataSeparate[6];         
            const response = new model.BirthDay(nicNumber).day;
            expect(response).toBe(parseInt(dayofweek,10));
            expect(response).not.toBe(false);
        }
    });

    test("validate code on 'birthday'. Method: dayName()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const dayName = dataSeparate[7];

            const response = new model.BirthDay(nicNumber).dayName;
            expect(response).toBe(dayName);
            expect(response).not.toBe(false);
            
        }
    });


});
