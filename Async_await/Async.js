/*async makes a function return a Promise
await makes a function wait for a Promise*/

async function myFunction() 
{
    return "Hello";
}
myFunction().then(
  function(value) {myDisplayer(value);},
  function(error) {myDisplayer(error);});

function myDisplayer(some) {
    console.log(some);
}