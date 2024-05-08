/**
    * This returns true if the nic number string length is valid.
    * @memberof lknic
    * @name lengthValdation
    * @function static function
    * @param {String} nic
    * @returns {boolean}
*/
function lengthValidator(nic){  
    return (nic.length == 10 || nic.length == 12);
}
module.exports = {lengthValidator};
