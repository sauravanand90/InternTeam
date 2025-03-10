function displayer1(some){
    console.log(some);
}
function calc1(num1, num2,mycallback){
    let sum=num1+num2;
    mycallback(sum);
}
calc1(5,100,displayer1);
//displayer1 acts as a callback function