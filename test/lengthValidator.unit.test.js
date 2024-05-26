import lengthValidator from '../src/modules/validationModule/lengthValidator';
import { realNic } from './testData';

const real_nic = realNic();

describe('Test length validation: id-001', () => {

    test('Verification using real nic numbers.', () => {
       
        for (let index = 0; index < real_nic.length; index++) {
            
            const dataSeparate = real_nic[index].split(':');
            const nicNumber = dataSeparate[0];
            const inputResult = dataSeparate[1];

            const response = lengthValidator(nicNumber);
            expect(response).toBe(inputResult === "true");
        }
    });
});




