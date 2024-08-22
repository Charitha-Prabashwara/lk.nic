import { Validate, BirthDay, Generation } from "lknic";

const nic = '746060830v';
const ee = new Validate().isValidNIC(nic)
const bb = new BirthDay(nic).birthYear
const gg = new Generation().witchGeneration(nic);
console.log(bb);
console.log(gg);
console.log(ee);