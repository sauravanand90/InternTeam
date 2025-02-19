function firstfun()
{
    console.log("first function");
}
function secondfun(){
    console.log("second function");
}
firstfun();
secondfun(); 
/*output: first function
second function */



function firstfun()
{
    console.log("first function");
}
function secondfun(){
    console.log("second function");
}

secondfun(); 
firstfun();
/* second function
first function*/

/* output depends on when the function is called and not which is defined first*/
