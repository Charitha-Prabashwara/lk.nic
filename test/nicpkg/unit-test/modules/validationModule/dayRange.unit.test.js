import { DayRange } from 'lknic';
import { realNic, fakeNicForDayRangeTest } from '../../../../testData';

const real_nic = realNic();
const fake_nic = fakeNicForDayRangeTest();

describe("Is the date coded in the ID within the valid range for the relevant year?", ()=>{
    
    test("Testing the 'isValidDayRangeFromNIC' method with valid data.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const nicNumber = dataSeparate[0];

            const response = new DayRange().isValidDayRangeFromNIC(nicNumber);
            expect(response).toBe(true);
            
        }
    });

    test("Testing the 'isValidDayRangeFromEpoch' method with valid data.", ()=>{
        for (let i = 0; i < real_nic.length; i++) {
           
            const dataSeparate = real_nic[i].split(':');
            const days = dataSeparate[4];
            const year = dataSeparate[3];
            
            const response = new DayRange().isValidDayRangeFromEpoch(parseInt(days), parseInt(year));
            expect(response).toBe(true);
            
        }
    });

    test("Testing the 'isValidDayRangeFromEpoch' method with using fake and invalid nic numbers.", ()=>{
        for (let i = 0; i < fake_nic.length; i++) {
           
            const dataSeparate = fake_nic[i].split(':');
            const nicNumber = dataSeparate[0];

            const response = new DayRange().isValidDayRangeFromNIC(nicNumber);
            expect(response).toBe(false);
            
        }
    });

    test("Testing the 'isValidDayRangeFromEpoch' method withusing fake and invalid nic numbers.", ()=>{
        for (let i = 0; i < fake_nic.length; i++) {
           
            const dataSeparate = fake_nic[i].split(':');
            const days = dataSeparate[4];
            const year = dataSeparate[3];
            
            const response = new DayRange().isValidDayRangeFromEpoch(parseInt(days), parseInt(year));
            expect(response).toBe(true);
            
        }
    });
});