const isValidCharsModule = require('./support_func/isValidChars');
/**
    * This returns true if the nic number string length is valid.
    * @memberof lknic
    * @name isValidChars
    * @function
    * @param {String} nic
    * @returns {boolean}
*/
function ValidChars(nic){  
    return (isValidCharsModule.isValidChars(nic));
}

module.exports = {ValidChars};