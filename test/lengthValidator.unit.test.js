const model = require('../src/modules/validationModule/lengthValidator');
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
});




