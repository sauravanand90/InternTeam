// The try statement defines a block of code to be tested for errors while it is being executed.
// The catch statement defines a block of code to be executed, if an error occurs in the try block.
// The finally statement defines a code block to run regardless of the result.
// The throw statement defines a custom error.

try {
    let res = 10/0
    if(!isFinite(res)){
        throw new Error("Cannot divide by zero")
    }
    console.log(res)
  }
  catch(err) {
    console.log("Error occurred:", err.message);
  }
  finally{
      console.log("Execution completed")
  }