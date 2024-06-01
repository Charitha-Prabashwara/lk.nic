import { isValidChars } from 'lknic';
import { realNic } from '../../../../testData';

const real_nic = realNic();

describe("Test check valid char's in the nic.", ()=>{
    
    test("Check is avalilable numeric char's in nic{String}", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            const inputResult = dataSeparate[1];

            const response = isValidChars(nicNumber);
            expect(response).toBe(inputResult === "true");
            
        }
    });
});