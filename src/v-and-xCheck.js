const validityUsingVX = require('./support_func/nicValidityUsingVX');
const ForOldGenerationVX = require('./support_func/checkForOldGenerationVX');
const ForNewGenerationVX = require('./support_func/checkForNewGenerationVX');

class vxCheck{

    constructor(nic){
        this.nic = nic;
    }

    isValid(){
        return validityUsingVX.verifyNicValidityUsingVX(this.nic);
    }

    isOldGeneration(){
        return ForOldGenerationVX.vxCheckForOldGeneration(this.nic);
    }
    
    isNewGeneration(){
        return ForNewGenerationVX.vxCheckForNewGeneration(this.nic);
    }
}

module.exports ={vxCheck};

