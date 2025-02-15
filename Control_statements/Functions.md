**FUNCTIONS**

These are the building blocks allowing developers to encapsulate reusable blocks of code. These increases the code readability and modularity.

_Basic Syntax of Function_ 
```
function sayMyName(){ 
    console.log("Rahul")
}
sayMyName()
```
_Function with Parameter_
```
function Average(num1, num2){              //Here num1 and num2 are the parameters
  let avg = (num1 + num2)/2
  console.log("Average:", avg)
}
Average(3,70)                              //3 and 70 are the arguments
```
_Return Function_
```
function getSum(a,b,c){
  let sum = a+b+c
  return sum
}
let ans = getSum(1,2,3)
console.log("Print Sum: ",ans)
```
```
let getMultiplication = function (a,b) {
    return a*b
}
console.log(getMultiplication(2,10))
```
