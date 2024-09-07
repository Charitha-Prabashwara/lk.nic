import { Generation } from 'lknic';
import { realNic , fakeNicForDayRangeTest} from '../../../../testData';

const real_nic = realNic();
const fake_nic = fakeNicForDayRangeTest();

try {
    describe('Test identity number generation: id-001 , Module: Generation', () => {

        test("error check validation-lines on 'Generation'. Method: witchGeneration()", () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                //const inputResult = dataSeparate[1];
                const generation = dataSeparate[2];
    
                const response = new Generation().whichGeneration(nicNumber);
                expect(response).not.toBe(false);
            }
        });
        
        test('validation using real nic numbers. Method: witchGeneration()', () => {
           
            for (let index = 0; index < real_nic.length; index++) {
                
                const dataSeparate = real_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                //const inputResult = dataSeparate[1];
                const generation = dataSeparate[2];
    
                const response = new Generation().whichGeneration(nicNumber);
                expect(response).toBe(generation);
            }
        });
    
    });
    
    describe('Test exceptions: module:generation', () => {
        test('Exception test method: witchGeneration()', () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                //const inputResult = dataSeparate[1];
                const generation = dataSeparate[2];
    
               
                expect(()=> new Generation().whichGeneration(nicNumber)).toThrow();
            }
        });
    
        test('Exception test method: determiningTheGenerationFromChar()', () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                //const inputResult = dataSeparate[1];
                const generation = dataSeparate[2];
    
               
                expect(()=> new Generation().determiningTheGenerationFromChar(nicNumber)).toThrow();
            }
        });
    
        test('Exception test method: determiningTheGenerationFromLength()', () => {
           
            for (let index = 0; index < fake_nic.length; index++) {
                
                const dataSeparate = fake_nic[index].split(':');
                const nicNumber = dataSeparate[0];
                //const inputResult = dataSeparate[1];
                const generation = dataSeparate[2];
    
               
                expect(()=> new Generation().determiningTheGenerationFromLength(nicNumber)).toThrow();
            }
        });
    });
    
} catch (error) {
    expect(error.message).toMatchSnapshot();
}