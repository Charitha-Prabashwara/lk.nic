const model = require('../src/v-and-xCheck');
const testData = require('./testData');

real_nic = testData.real_nic;

describe("Test check vV,xX characters in the nic.", ()=>{
    
    test("Verify nic validity using 'v' and 'x'.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            const inputResult = dataSeparate[1];

            const response = new model.vxCheck(nicNumber);
            expect(response.isValid()).toBe(inputResult === "true");
            
        }
    });

    test("Detect generation using 'v' and 'x'.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            const inputResult = dataSeparate[1];
            const generation = dataSeparate[2];

            
            if(generation == "1"){
                const responseOld = new model.vxCheck(nicNumber);
                expect(responseOld.isOldGeneration()).toBe(true);
            }else if(generation == "2"){
                const responseNew = new model.vxCheck(nicNumber);
                expect(responseNew.isNewGeneration()).toBe(true);
            }else{
                expect(true).toHaveBeenCalled();
            }
            
        }
    });
});