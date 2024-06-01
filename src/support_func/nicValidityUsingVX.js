import { vCount, xCount } from "./vxCount.js";

function verifyNicValidityUsingVX(nic){
    const VCOUNT = vCount(nic);
    const XCOUNT = xCount(nic);

    const RULE1  = (VCOUNT == 1 && XCOUNT ==0);
    const RULE2  = (VCOUNT == 0 && XCOUNT ==1);
    const RULE3  = (VCOUNT == 0 && XCOUNT == 0);
    const CHECK  = (RULE1 || RULE2 || RULE3);
    return CHECK;
}
export default verifyNicValidityUsingVX;
