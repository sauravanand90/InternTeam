1. Starting with the cargoHold array ['oxygen tanks', 'space suits', 'parrot', 'instruction manual', 'meal packs', 'slinky', 'security blanket'] write statements to do the following:

Use bracket notation to replace 'slinky' in the array with 'space tether'. Print the array to confirm the change.

Remove the last item from the array with pop. Print the element removed and the updated array.

Remove the first item from the array with shift. Print the element removed and the updated array.

Unlike pop and shift, push and unshift require arguments inside the (). Add the items 1138 and '20 meters' to the array - the number at the start and the string at the end. Print the updated array to confirm the changes.

Use a template literal to print the final array and its length.
```
let cargoHold = ['oxygen tanks', 'space suits', 'parrot', 'instruction manual', 'meal packs', 'slinky', 'security blanket']
console.log(cargoHold)
cargoHold[5] = "space tether"
console.log(cargoHold)
console.log(cargoHold.pop())
console.log(cargoHold)
console.log(cargoHold.shift())
console.log(cargoHold)
cargoHold.unshift(1138)
cargoHold.push('20 metres')
console.log(cargoHold)
console.log(`The array ${cargoHold} has a length of ${cargoHold.length}.`)
```
