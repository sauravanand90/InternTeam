/*"Producing code" is code that can take some time
"Consuming code" is code that must wait for the result
A Promise is an Object that links Producing code and Consuming code*/

function displayer(some) {
    console.log(some);
}
let myPromise=new Promise(function(myResolve , myReject) {
    let x=-40;
    console.log("x is : "+x);
    if(x>=0)
        myResolve("no error");
    else
        myReject("error");
});
myPromise.then(
    function (value) {
        displayer(value); 
    },
    function(error){
        displayer(error);
});
