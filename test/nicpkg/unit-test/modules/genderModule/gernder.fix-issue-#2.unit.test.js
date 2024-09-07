import { Gender } from 'lknic';
import { realNic, fakeNicForDayRangeTest } from '../../../../testData';

const real_nic = realNic();
const fake_nic = fakeNicForDayRangeTest();

try {
    describe('Bugfix - Gender module - issue #2', () => {

        test("validate code on 'gender'. Method: genderRoStr()", () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                const gender = dataSeparate[8];
    
                const response = new Gender(nicNumber).genderToStr(nicNumber);
                expect(response).toBe(gender);
                expect(response).not.toBe(false);
            }
        });
    
        test("validate code on 'gender'. Method: genderRoStr() using invalid data", () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                const gender = dataSeparate[8];
    
                try {
                    
                    expect(new Gender(nicNumber).genderToStr()).toThrow(TypeError);
                } catch (error) {
                    expect(error).toMatchSnapshot()
                }
            }
        });
    
    
    });
    
    
} catch (error) {
    expect(error.message).toMatchSnapshot();
}