export class vxNotFoundInOldGeneration extends Error{
    errorMsg=null;
    constructor(){
        this.errorMsg = "Invalid character detected in string."
    }
}

export default vxNotFoundInOldGeneration;