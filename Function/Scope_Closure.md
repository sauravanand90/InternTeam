***Scope:*** 

The inner function can access variables from the outer function because of JavaScript's lexical scoping. However, the outer function cannot access variables inside the inner function.

***Closure:***

A closure is the combination of a function bundled together with references to its surrounding state. In other words, a closure gives access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

**Lexical scoping**

Lexical scoping means that a function’s scope is determined by the location where it is defined in the code, not where it is invoked. This concept defines the rules for how variables are accessible to functions based on their position in the source code.
```
function outer(){
    let username = "Ramesh"
    //console.log("OUTER", secret)
    function inner(){
        let secret = "my123"
        console.log("INNER", username)
    }
    function inner2(){
        console.log("INNER2", username)
       //console.log(secret)
    }
    inner()
    inner2()
}
outer()
```

**Closure**

In the given example, the return statement will not only return the displayName function but along with that it will return the scope(lexical scope) of outer function if exists.
```
function makeFunc(){
  const name = "Mozilla"
  function displayName(){
    console.log(name)
  }
  return displayName
}
const myFunc = makeFunc()
myFunc()
```
