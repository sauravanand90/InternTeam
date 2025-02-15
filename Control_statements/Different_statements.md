**1. IF STATEMENT**

In JS or other programming languages, if statement is used to check whether a given condition is true and if the condition is true then a block of code is executed.
```
let age = 19
if(age>18){
  console.log("You can drive.")
}
```

**2. IF-ELSE STATEMENT**

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

**3. IF-ELSE IF LADDER STATEMENT**

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

**4. NESTED-IF STATEMENT**

In this type of statement, another if condition is nested within a if condition.
```
let a=12
if(a>10){
  if(a>15){
    console.log("Number is greater than 10 and 15")
  }else{
    console.log("Number is greater than 10 but less than 15")
  }
}
```

**5. SWITCH STATEMENT**

The switch statement executes a block of code based upon the matching cases. It is an alternative to long if-else cahins as it improves readability. In this, expression is evaluated and once a match is found, the corresponding block of code following the case is executed. Once the code is executed, the break statement ends the switch statement. If the break statement is not used then the rest of the cases will also be evaluated. If none of the cases is matched then the execution jumps to the default case if present. The default case is optional.

```
let day = 5
let DayName
switch (day) {
    case 1:
        DayName = "Monday"
        break
    case 2:
        DayName = "Tuesday"
        break
    case 3:
        DayName = "Wednesday"
        break
    case 4:
        DayName = "Thursday"
        break
    case 5:
        DayName = "Friday"
        break
    case 6:
        DayName = "Saturday"
        break
    case 7:
        DayName = "Sunday"
        break
    default: DayName = "Invalid day"
}
console.log(DayName)
```

PRACTICE PROBLEM BASED UPON SWITCH STATEMENT

Program to calculate the average marks of the students and then print the corresponding grade.
```
let marks = [['Rahul', 80], ['Rohan', 95], ['Sita', 82], ['Mohit', 86], ['Ram', 90]]
let n = marks.length
let totalmarks=0
for(let i=0; i<marks.length; i++){
  totalmarks += marks[i][1]
}
let Avg = totalmarks/n
console.log("Average Marks = " + Avg)

if(Avg>90){
  console.log("Grade : A")
}
else if(Avg>80 && Avg<90){
  console.log("Grade : B")
}
else if(Avg>70 && Avg<80){
  console.log("Grade : C")
}
else{
  console.log("Grade : D")
} 
```
Program to find the sign of product of three numbers.
```
let a = 7
let b = -5
let c = 2
function getSign(value){
  if(value>0){
    return "+"
  }else if(value<0){
    return "-"
  }else{
    return 0
  }
}
let SignA = getSign(a)
let SignB = getSign(b)
let SignC = getSign(c)
let sign = (SignA==SignB && SignB==SignC) ? "+" : "-"
console.log("Sign of product of three numbers is " + sign)
```
