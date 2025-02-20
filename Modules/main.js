import { sum, greet, difference, message } from './script.js' 
//We can also change the name of imported functions or variables
//import { sum, greet as wish} from './script.js'
//console.log(wish)

console.log(greet)
console.log("The sum is : ", sum(5, 3))
difference(10, 6)
console.log(message())

// We can also import everything at once
// import * as main from './script.js'

// console.log(main.greet)
// console.log("The sum is : ", main.sum(5, 3))