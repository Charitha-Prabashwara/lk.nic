const vxCounter = require('./vxCount');

function vxCheckForOldGeneration(nic){
    const VCOUNT = vxCounter.vCount(nic);
    const XCOUNT = vxCounter.xCount(nic);
    const RULE1  = (VCOUNT == 1 && XCOUNT ==0);
    const RULE2  = (VCOUNT == 0 && XCOUNT ==1);
    const CHECK  = (RULE1 || RULE2);
    return CHECK;
}
module.exports = {
    vxCheckForOldGeneration
};