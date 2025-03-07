**ARRAYS**

Arrays are similar to strings. Like strings, arrays are a sequence of values that can be accessed via an ordered index. Unlike strings, arrays can store data of any type. Arrays are mutable.

***Declaring an Array***
```
let emptyArray = []
let numbers = ["One", "Two", "Three", "Four"]
let fruits = [
   "Mango",
   "Apple",
   "Grapes",
   "Banana"
]
```
***Array Length***
```
let emptyArray = []
console.log(emptyArray.length)    //0
let programmingLanguages = ["JavaScript", "Python", "Java", "C#"]
console.log(programmingLanguages.length)     //4
```
***Varying Data Types***

JavaScript arrays can hold a mixture of values of any type. For example, we can have an array that contains strings, numbers, and booleans.
```
let grabBag = ["A string value", true, 99, 105.5]
```
***Array Indexing***

Accessing the elements of an array using index.
```
let programmingLanguages = ["JavaScript", "Python", "Java", "C#"]
console.log(programmingLanguages[0])     //JavaScript
console.log(programmingLanguages[3])     //C#
console.log(programmingLanguages[4])     //undefined
```
