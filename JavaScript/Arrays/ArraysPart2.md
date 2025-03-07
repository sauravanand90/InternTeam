**MULTI-DIMENSIONAL ARRAYS**

A multi-dimensional array is an array of arrays, meaning that the values inside the array are also arrays. The inner arrays can store other values such as strings, numbers, or even more arrays.

***Two-Dimensional Array***

The simplest form of a multi-dimensional array is a two dimensional array. A two dimensional array is like a spreadsheet with rows and columns. To access items in a two dimensional array, use square bracket notation and two indexes array[0][0]. The first index is for the outer array, or the "row", and second index is for the inner array, or the "column".
```
let Groups = [['Rohan', 'Sahil', 'Mohit'], ['Ram', 'Shyam', 'Harsh'],['Aman', 'Mayank', 'Rahul']]
console.log(Groups[0][2])   //Mohit
console.log(Groups[1][1])   //Shyam
console.log(Groups[2][1])   //Mayank
```
***Multi-Dimensional Array Methods***

In a multi-dimensional array, both the inner and outer arrays can be altered with array methods. However, bracket notation must be used correctly.
```
let Groups = [['Rohan', 'Sahil', 'Mohit'], ['Ram', 'Shyam', 'Harsh'],['Aman', 'Mayank', 'Rahul']]
let newGroup = ['Amit', 'Anshika', 'Priya']
Groups.push(newGroup)
console.log(Groups[3][2])
Groups[1].reverse()
console.log(Groups[1])
```
