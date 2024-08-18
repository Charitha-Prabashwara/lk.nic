import isValidChars from '../../support_func/isValidChars.js';
    
/**
     * @function ValidChars
     * @description Checks if there are valid characters matching a national ID card.
     * @param {string} nicNumber 
     * @returns {boolean}
     * @date 2024/08/18
*/

function ValidChars(nic){  

    return (isValidChars(nic));
}

export default ValidChars;