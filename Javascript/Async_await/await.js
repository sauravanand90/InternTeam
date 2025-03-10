/* The await keyword can only be used inside an async function.
The await keyword makes the function pause the execution and wait 
for a resolved promise before it continues*/
// let value=await promise;

async function display() {
    let myPromise=new Promise(function(resolve,reject){
        resolve("Javascript");
    });
    console.log(await myPromise);
}
display();


//without reject
async function display() {
    let myPromise=new Promise(function(resolve){
        resolve("Javascript");
    });
    console.log(await myPromise);
}
display();

// waiting for timeout
async function display() {
    let myPromise=new Promise(function(resolve){
        setTimeout(function(){resolve("Javascript");},3000); 
    });
    console.log(await myPromise);
}
display();
