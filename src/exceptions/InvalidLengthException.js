class InvalidLengthException extends Error{
    errorMsg=null;
    constructor(){
        this.errorMsg = "Invalid length: expected 10, 12 character length.";
        super(this.errorMsg);
    }
}

export default InvalidLengthException;