Problem 1:

Use splice to make the following changes to the cargoHold array ['oxygen tanks', 'space suits', 'parrot', 'instruction manual', 'meal packs', 'slinky', 'security blanket']. Be sure to print the array after each step to confirm your updates.

Insert the string 'keys' at index 3 without replacing any other entries.

Remove 'instruction manual' from the array. (Hint: indexOf is helpful to avoid manually counting an index).

Replace the elements at indexes 2 - 4 with the items 'cat', 'fob', and 'string cheese'.
```
let cargoHold = ['oxygen tanks', 'space suits', 'parrot', 'instruction manual', 'meal packs', 'slinky', 'security blanket']
cargoHold.splice(3,0,'keys')
console.log(cargoHold)
cargoHold.splice(4,1)
console.log(cargoHold)
cargoHold.splice(2,3,'cat','fob','string cheese')
console.log(cargoHold)
```
Problem 2:

Concatenate two arrays.
```
let holdCabinet1 = ['duct tape', 'gum', 3.14, false, 6.022e23]
let holdCabinet2 = ['orange drink', 'nerf toys', 'camera', 42, 'parsnip']
console.log(holdCabinet1.concat(holdCabinet2))
console.log(holdCabinet1)
```
