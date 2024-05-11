const vxCounter = require('./support_func/vxCount');

function verifyNicValidityUsingVX(nic){
    const VCOUNT = vxCounter.vCount(nic);
    const XCOUNT = vxCounter.xCount(nic);

    const RULE1  = (VCOUNT == 1 && XCOUNT ==0);
    
    const RULE2  = (VCOUNT == 0 && XCOUNT ==1);
    
    const RULE3  = (VCOUNT == 0 && XCOUNT == 0);

    const CHECK  = (RULE1 || RULE2 || RULE3);

    return CHECK;
}

function vxCheckForOldGeneration(nic){
    const VCOUNT = vxCounter.vCount(nic);
    const XCOUNT = vxCounter.xCount(nic);
    const RULE1  = (VCOUNT == 1 && XCOUNT ==0);
    const RULE2  = (VCOUNT == 0 && XCOUNT ==1);
    const CHECK  = (RULE1 || RULE2);
    return CHECK;
}

function vxCheckForNewGeneration(nic){
    const VCOUNT = vxCounter.vCount(nic);
    const XCOUNT = vxCounter.xCount(nic);
    const RULE  = (VCOUNT == 0 && XCOUNT ==0);
    const CHECK  = (RULE);
    return CHECK;
}
module.exports ={
    vxCheckForOldGeneration,
    vxCheckForNewGeneration,
    verifyNicValidityUsingVX
    };

