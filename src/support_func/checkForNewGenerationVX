const vxCounter = require('./vxCount');

function vxCheckForNewGeneration(nic){
    const VCOUNT = vxCounter.vCount(nic);
    const XCOUNT = vxCounter.xCount(nic);
    const RULE  = (VCOUNT == 0 && XCOUNT ==0);
    const CHECK  = (RULE);
    return CHECK;
}
module.exports = {
    vxCheckForNewGeneration
};