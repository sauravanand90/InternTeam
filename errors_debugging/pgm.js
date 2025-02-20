/* The try statement defines a code block to run (to try).

The catch statement defines a code block to handle any error.

The finally statement defines a code block to run regardless of the result.

The throw statement defines a custom error.*/

//error msg being displayed
try{
    addlert("hello!!");
}
catch(err)
{
    console.log(err.message);
}
// addlert is undefined
//The exception can be a JavaScript String, a Number, a Boolean or an Object:

