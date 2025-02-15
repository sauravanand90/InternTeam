**1. For loop**

The for loop is used when the number of iterations are known like for how many times the given block of code will be executed.

_Example_ - Program to sort a given array into two new arrays.
```
let arr = [2, 3, 13, 18, -5, 38, -10, 11, 0, 104]
let even = []
let odd = []
for(let i=0; i<arr.length; i++){
  if(arr[i]%2 == 0){
    even.push(arr[i])
 }else{
    odd.push(arr[i])
  }
}
console.log(even)
console.log(odd)
``` 
**2. While Loop**

This loop executes a block of code until a given condition is true. In this, condition is checked first and on the basis of that the code is executed.

_Example_ - Program to sum only positive numbers.
```
let num = 0, sum = 0
while(num>=0){
  sum += num
  num = parseInt(prompt("Enter a number:")) 
}
console.log("The sum is " + sum)
```
In the above example, parseInt is used to convert the input into number in order to add otherwise it will be concatenated.

**3. Do-while Loop**

This loop executes a block of code repeatedly based upon a given condition. It is similar to while loop but the only difference is that this loop guarantees that the code block is executed atleast once regardless of whether the condition is fulfilled or not.

_Example_ - Program to sum only positive numbers.
```
let num=0, sum=0
do{
  sum += num
  num = parseInt(prompt("Enter a number:"))
}while(num>=0)
console.log("The sum is " + sum)
```
**4. For-in Loop**

This loop iterates over the properties of an object. It allows to access each key property of an object. It is not recommended to access the properties of an array.
```
let details = {
    name: "Rahul",
    "job role": "Engineer",
    age: 23
};
for(let key in details) {
    console.log(details[key]);
}

let value = Object.values(details)
console.log(value)         //Directly prints the array of values

Object.entries(details).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)                 // can also be written as -- console.log(key + ": " + details[key])  OR console.log(key + ": " + value)       
})
```
The ($) sign in the code is used inside template literals, which are enclosed by backticks(`). Template literals allow for string interpolation, meaning we can embed variables directly inside a string without the need of string concatenation. String interpolation is the process of embedding expressions inside a string.
