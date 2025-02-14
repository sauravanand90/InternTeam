IF STATEMENT

In JS or other programming languages, if statement is used to check whether a given condition is true and if the condition is true then a block of code is executed.
```
let age = 19
if(age>18){
  console.log("You can drive.")
}
```

IF-ELSE STATEMENT

In if-else statement, a condition is checked and if the condition is true then a block of code is executed otherwise the code written in else part is executed.
```
let age = 19
if(age>18){
  console.log("You can drive")
}
else{
  console.log("You can't drive.")
}
```

IF-ELSE IF LADDER STATEMENT

This statement is used when there are multiple conditions present. The if statements are executed from top and as soon as the condition becomes true, the statement associated with that is executed and the rest of the conditions are left. If no condition becomes true then statement in else block is executed.

```
for (let i = 0; i <= 20; i++) {
    if (i == 0) {
        console.log(i + " is even")
    }
    else if (i % 2 == 0) {
        console.log(i + " is even")
    }
    else {
        console.log(i + " is odd")
    }
} 
```
