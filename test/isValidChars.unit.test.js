const model = require('../src/modules/validationModule/notInvalidChars');
const testData = require('./testData');

real_nic = testData.real_nic;

describe("Test check valid char's in the nic.", ()=>{
    
    test("Check is avalilable numeric char's in nic{String}", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            const inputResult = dataSeparate[1];

            const response = model.ValidChars(nicNumber);
            expect(response).toBe(inputResult === "true");
            
        }
    });
});