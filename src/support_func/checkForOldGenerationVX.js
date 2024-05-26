//const vxCounter = require('./vxCount');
import { vCount, xCount } from './vxCount';

function vxCheckForOldGeneration(nic){
    const VCOUNT = vCount(nic);
    const XCOUNT = xCount(nic);
    const RULE1  = (VCOUNT == 1 && XCOUNT ==0);
    const RULE2  = (VCOUNT == 0 && XCOUNT ==1);
    const CHECK  = (RULE1 || RULE2);
    return CHECK;
}
export default vxCheckForOldGeneration;