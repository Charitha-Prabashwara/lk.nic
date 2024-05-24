const model = require('../src/birthday');
const testData = require('./testData');

real_nic = testData.real_nic;
monthNames = testData.monthNames;

describe('Test identity, calculate birthday: id-001 , Module: birthday', () => {

    test("validate code on 'birthday'. Method: birthYear()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            //const inputResult = dataSeparate[1];
            //const generation = dataSeparate[2];
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
            //const inputResult = dataSeparate[1];
            //const generation = dataSeparate[2];
            //const birthYear = dataSeparate[3];
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
            //const inputResult = dataSeparate[1];
            //const generation = dataSeparate[2];
            //const birthYear = dataSeparate[3];
            //const days = dataSeparate[4];
            const month = dataSeparate[5];

            const response = new model.BirthDay(nicNumber).month;
            expect(response).toBe(parseInt(month,10));
            
        }
    });


    test("validate code on 'birthday'. Method: monthName()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            //const inputResult = dataSeparate[1];
            //const generation = dataSeparate[2];
            //const birthYear = dataSeparate[3];
            //const days = dataSeparate[4];
            const month = dataSeparate[5];

            const response = new model.BirthDay(nicNumber).monthName;
            expect(response).toBe(monthNames[parseInt(month,10)]);
            
        }
    });


});