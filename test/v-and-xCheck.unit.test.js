//const model = require('../src/modules/validationModule/v-and-xCheck');
import vxCheck from '../src/modules/validationModule/v-and-xCheck';
//const testData = require('./testData');
import { realNic } from './testData';
const real_nic = realNic();

describe("Test check vV,xX characters in the nic.", ()=>{
    
    test("Verify nic validity using 'v' and 'x'.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            const inputResult = dataSeparate[1];

            const response = new vxCheck(nicNumber);
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
                const responseOld = new vxCheck(nicNumber);
                expect(responseOld.isOldGeneration()).toBe(true);
            }else if(generation == "2"){
                const responseNew = new vxCheck(nicNumber);
                expect(responseNew.isNewGeneration()).toBe(true);
            }else{
                expect(true).toHaveBeenCalled();
            }
            
        }
    });
});