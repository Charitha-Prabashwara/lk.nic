/**
    * This returns true if the nic number string length is valid.
    * @memberof lknic
    * @name isValidChars
    * @function
    * @param {String} nic
    * @returns {boolean}
*/
function isValidChars(nic){
    const VALID_CHARACTERS = /[vVxX0-9]/gms;
    const INVALID_CHARACTERS = /[a-uA-UwWyYzZ]/gms;
    return (!INVALID_CHARACTERS.test(nic) && VALID_CHARACTERS.test(nic));
}

module.exports ={
    isValidChars
}
