**For loop**

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
