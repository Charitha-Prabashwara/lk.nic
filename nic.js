import { Validate } from "lknic";

const nic = '200013802842';
const ee = new Validate().isValidNIC(nic)
console.log(ee);