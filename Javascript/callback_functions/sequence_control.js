function displayer(some){
    console.log(some);
}
function calc(num1, num2){
    let sum=num1+num2;
    return sum;
}
let results=calc(5,100);
displayer(results);
//first calculate store the results and then call the displayer to display it

function displayer1(some){
    console.log(some);
}
function calc1(num1, num2){
    let sum=num1+num2;
    displayer1(sum);
}
calc1(5,100);
