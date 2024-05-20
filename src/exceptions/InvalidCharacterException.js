class InvalidCharacterException extends Error{
    errorMsg=null;
    constructor(){
        this.errorMsg = "Invalid character detected in 'nic' string.";
        super(this.errorMsg);
    }
}

export default InvalidCharacterException;