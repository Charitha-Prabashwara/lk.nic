//const validityUsingVX = require('../../support_func/nicValidityUsingVX');
import verifyNicValidityUsingVX from '../../support_func/nicValidityUsingVX'
//const ForOldGenerationVX = require('../../support_func/checkForOldGenerationVX');
import vxCheckForOldGeneration from '../../support_func/checkForOldGenerationVX';
//const ForNewGenerationVX = require('../../support_func/checkForNewGenerationVX');
import vxCheckForNewGeneration from '../../support_func/checkForNewGenerationVX';

class vxCheck{

    constructor(nic){
        this.nic = nic;
    }

    isValid(){
        return verifyNicValidityUsingVX(this.nic);
    }

    isOldGeneration(){
        return vxCheckForOldGeneration(this.nic);
    }
    
    isNewGeneration(){
        return vxCheckForNewGeneration(this.nic);
    }
}

export default vxCheck;
