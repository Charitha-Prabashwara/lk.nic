import { Validate, BirthDay, Generation } from "lknic";

const nic = '746060830v';
let result= new Validate().isValidNIC(nic);
if(result){
    console.log("valid");
}else{
     console.log("invalid");
}