import { Validate, BirthDay } from "lknic";

const nic = '746060830v';
const ee = new Validate().isValidNIC(nic)
const bb = new BirthDay(nic).birthYear
console.log(bb);