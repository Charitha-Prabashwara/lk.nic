//const model = require('../src/modules/generationModule/whichGeneration');
import Generation from '../src/modules/generationModule/whichGeneration';
//const testData = require('./testData');
import { realNic } from './testData';
const real_nic = realNic();

describe('Test identity number generation: id-001 , Module: Generation', () => {

    test("error check validation-lines on 'Generation'. Method: witchGeneration()", () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            //const inputResult = dataSeparate[1];
            const generation = dataSeparate[2];

            const response = new Generation().witchGeneration(nicNumber);
            expect(response).not.toBe(false);
        }
    });
    
    test('validation using real nic numbers. Method: witchGeneration()', () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            //const inputResult = dataSeparate[1];
            const generation = dataSeparate[2];

            const response = new Generation().witchGeneration(nicNumber);
            expect(response).toBe(generation);
        }
    });

});
