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
_Arrow Function_ 

Arrow functions are a concise syntax for writing functions.
```
let getExp = (x,y) => {
    let ans = x**y
    return ans
}
console.log(getExp(2,10))
```
_Nested Function_

A nested function is a function defined inside another function. The inner function has access to the variables and parameters of its outer function, which makes it a useful tool for tasks like closures.
```
function outerFunction(outerVariable) {
  console.log("Outer function: " + outerVariable)
  function innerFunction(innerVariable) {
    console.log("Inner function: " + innerVariable)
    console.log("Accessing outer function's variable: " + outerVariable)
  }
  innerFunction("Hello from the inner function!")
}
outerFunction("Hello from the outer function!")
```

**NOTE**

Scope: The inner function can access variables from the outer function because of JavaScript's lexical scoping. However, the outer function cannot access variables inside the inner function.

Closures: When the inner function "remembers" the environment (variables) in which it was created, this behavior is known as a closure. This allows the inner function to access variables from the outer function even if it's called outside of its original scope.
```
function outerFunction(outerVariable) {
  return function innerFunction() {
    console.log("Accessing outer function's variable: " + outerVariable)
  }
}
const closureFunction = outerFunction("I am outer!")
closureFunction()                          //Accessing outer function's variable: I am outer!
```
