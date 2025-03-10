/* Error Name	Description
EvalError	An error has occurred in the eval() function
RangeError	A number "out of range" has occurred
ReferenceError	An illegal reference has occurred
SyntaxError	A syntax error has occurred
TypeError	A type error has occurred
URIError	An error in encodeURI() has occurred */

//RangeError
let num=1.79;
try{
  console.log( num.toPrecision(500));
}
catch(err)
{
    console.log(err.message);
}

//ReferenceError
let x=1;
try{
    x=y+2;
}
catch(err)
{
    console.log(err.name);
}//y is undefined


//SyntaxError
try{
    eval("alert('hello)");
}
catch(err)
{
    console.log(err.name);
}

//TypeError
let num1=1;
try{
    console.log(num1.toUpperCase());
}
catch(err)
{
    console.log(err.name);
}

//URIError
try {
    decodeURI("%%%");   
  }
  catch(err) {
   console.log(err.name+"->"+err.message);
  }