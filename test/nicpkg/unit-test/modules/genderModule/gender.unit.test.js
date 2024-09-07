import { Gender } from 'lknic';
import { realNic, fakeNicForDayRangeTest } from '../../../../testData';

const real_nic = realNic();
const fake_nic = fakeNicForDayRangeTest();
try {
    describe('Test module:gender', () => {

        test("Test method: genderRoStr()", () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                const gender = dataSeparate[8];
    
                const response = new Gender(nicNumber).genderToStr();
                expect(response).toBe(gender);
                expect(response).not.toBe(false);
                
            }
        });
    
        test("Test method: genderRoInt()", () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
    
                const response = new Gender(nicNumber).genderToInt();
                if(gender == "male"){gender = 1;}
                if(gender == "female"){gender = 2;}
                expect(response).toBe(gender);
                expect(response).not.toBe(false);
            }
        });
    
        test("Test method: isMale()", () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
    
                const response = new Gender(nicNumber).isMale();
                if(gender == "male"){gender = true;}
                if(gender == "female"){gender = false;}
                expect(response).toBe(gender);
            }
        });
    
        test("Test method: isFemale()", () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
    
                const response = new Gender(nicNumber).isFemale();
                if(gender == "male"){gender = false;}
                if(gender == "female"){gender = true;}
                expect(response).toBe(gender);
            }
        });
    
        test("Test method: isFemale()", () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
    
                const response = new Gender(nicNumber).isFemale();
                if(gender == "male"){gender = false;}
                if(gender == "female"){gender = true;}
                expect(response).toBe(gender);
            }
        });
    
    
    
    });
    
    
    describe('Test exceptions: module:gender', () => {
        test("Exception test -> method:genderRoStr()", () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
                
                expect(() => new Gender(nicNumber).genderToStr()).toThrow();
            }
        });
    
        test("Exception test -> method:genderToInt()", () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
                
                expect(() => new Gender(nicNumber).genderToInt()).toThrow();
            }
        });
    
        test("Exception test -> method:isMale()", () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
                
                expect(() => new Gender(nicNumber).isMale()).toThrow();
            }
        });
    
        test("Exception test -> method:isFemale()", () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
                
                expect(() => new Gender(nicNumber).isFemale()).toThrow();
            }
        });
    
        test("Exception test -> method:nicNumber()", () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                let gender = dataSeparate[8];
                
                expect(() => new Gender(nicNumber).nicNumber()).toThrow();
            }
        });
    });
    
} catch (error) {
    expect(error.message).toMatchSnapshot();
}