import { vCount, xCount } from './vxCount.js';

function vxCheckForNewGeneration(nic){
    const VCOUNT = vCount(nic);
    const XCOUNT = xCount(nic);
    const RULE  = (VCOUNT == 0 && XCOUNT ==0);
    const CHECK  = (RULE);
    return CHECK;
}
export default vxCheckForNewGeneration;