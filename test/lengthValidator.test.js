const model = require('../src/lengthValidator');
const testData = require('./testData');

real_nic = testData.real_nic;

describe('Test length validation: id-001', () => {

    test('Verification using real nic numbers.', () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const inputResult = dataSeparate[1];

            const response = model.lengthValidator(nicNumber);
            expect(response).toBe(inputResult === "true");
        }
    });

    // test('Verification using fake nic numbers.', () => {
    //     const response = model.lengthValidator('88888888888');
    //     expect(response).toBe(true);
    // });
    
    // test('Verification using random generated values.', () => {
    //     const response = model.lengthValidator('88888888888');
    //     expect(response).toBe(false);
    // });
});




