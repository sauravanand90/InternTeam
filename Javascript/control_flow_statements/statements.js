/* Control flow statements: are used to control the order in which statements are executed in a program.
 Examples include if, else, switch, while, and for loops.*/
 let number = 10;
 if (number > 5) {
     console.log("Number is greater than 5");
 }

/* if-else: JavaScript if-else statement executes a block of code based on a condition. If the condition evaluates to true, the code inside the “if” block executes; 
otherwise, the code inside the “else” block, if present, executes.*/
let i =10;
if(i>5)
    console.log("5 is less than 10");
else
console.log("5 is not less than 10");

/*switch: JavaScript switch statement is used to perform different actions based on different conditions. 
It is used when we have multiple conditions to check and we want to execute different blocks of code for
each condition.*/

let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Today is Monday");
        break;
        case "Tuesday":
            console.log("Today is Tuesday");
            break;
            default:
                console.log("Today is not Monday or Tuesday");
                break;
                }
/* nested if: JavaScript nested if statement is used to check multiple conditions.
It is used when we want to check multiple conditions and we want to execute different blocks of code for
each condition.*/

let age = 20;
let names = "John";
if (age > 18) {
    if (names == "John") {
        console.log("You are John and you are greater than 18");
        }
        }

/* if-else-if ladder:The if statements are executed from the top down. 
As soon as one of the conditions controlling the if is true, the statement associated with 
that if is executed, and the rest of the ladder is bypassed.
 If none of the conditions is true, then the final else statement will be executed.*/
 let num = 10;
 if (num > 5) {
    console.log("Number is greater than 5");
    }
    else if (num == 5) {
        console.log("Number is equal to 5");
        }
        else {
            console.log("Number is less than 5");
            }
            /*if-else-if ladder with multiple conditions:*/
            let num1 = 10;
            if (num1 > 5 && num1 < 10) {
                console.log("Number is greater than 5");
                }
                else if (num1 == 5) {
                    console.log("Number is equal to 5");
                    }
                    else if (num1 == 10) {
                        console.log("Number is equal to 10");
                        }
                        else {
                            console.log("Number is less than 5");
                            }

