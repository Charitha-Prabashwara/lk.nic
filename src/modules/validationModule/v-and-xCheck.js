import verifyNicValidityUsingVX from '../../support_func/nicValidityUsingVX'
import vxCheckForOldGeneration from '../../support_func/checkForOldGenerationVX';
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
