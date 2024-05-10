/**
    * This returns true if the nic number string length is valid.
    * @memberof lknic
    * @name isValidChars
    * @function
    * @param {String} nic
    * @returns {boolean}
*/
function isInInvalidChars(nic){

    const ONLYNUMERIC = /^\d+$/;

    for (let index = 0; index < nic.length; index++) {

        const element = nic.indexOf(index);
        
        if (ONLYNUMERIC.test(element)) {
            return true;
        }
    }
    return false;
}
export default isInInvalidChars;