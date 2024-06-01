import { Validate } from 'lknic';
import { realNic, fakeNicForDayRangeTest } from '../../../../testData';

const real_nic = realNic();
const fake_nic = fakeNicForDayRangeTest();

describe("All methods of verifying the validity of the National ID number are tested here.", ()=>{
    
    test("Testing the 'isValidNIC' method with valid data.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];

            const response = new Validate().isValidNIC(nicNumber);
            expect(response).toBe(true);
            
        }
    });

    test("Testing the 'isValidNIC' method with invalid data.", ()=>{
        for (let i = 0; i < fake_nic.length; i++) {
           
            const dataSeparate = fake_nic[i].split(':');
            const nicNumber = dataSeparate[0];

            const response = new Validate().isValidNIC(nicNumber);
            expect(response).toBe(false);
            
        }
    });

    test("Testing the 'isInvalidNIC' method with valid data.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            
            
            const response = new Validate().isInvalidNIC(nicNumber)
            expect(response).toBe(false);
            
        }
    });

    test("Testing the 'isInvalidNIC' method with invalid data.", ()=>{
        for (let i = 0; i < fake_nic.length; i++) {
           
            const dataSeparate = fake_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            
            
            const response = new Validate().isInvalidNIC(nicNumber)
            expect(response).toBe(true);
            
        }
    });

    test("Testing the 'invalidsCount' method with valid data.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            
            const response = new Validate().invalidsCount(nicNumber)
            expect(response).toBe(0);
            
        }
    });

    test("Testing the 'invalidsCount' method with valid data.", ()=>{
        for (let i = 0; i < fake_nic.length; i++) {
           
            const dataSeparate = fake_nic[i].split(':');
            const nicNumber = dataSeparate[0];
            
            const response = new Validate().invalidsCount(nicNumber)
            expect(response).not.toBe(0);
            
        }
    });
});