//Syntax Error: A error in the syntax
try{
    eval("console.log('Hello World)")
} catch(error) {
    console.log("Caught a SyntaxError:", error.message)
}

//Reference Error: An illegal reference has occurred
try{
    console.log(myVar)
} catch(error){
    console.log("Caught a ReferenceError:", error.message)
}

//Type Error: A type error has occurred
try{
    let num=10
    console.log(num.toUpperCase())
} catch(error){
    console.log("Caught a TypeError:", error.message)
}

//Range Error: A number "out of range" has occurred
try{
    let arr = new Array(-1)
} catch (error){
    console.log("Caught a RangeError:", error.message)
}

//URI Error: Occurs when using invalid characters in encodeURI() or decodeURI()
try{
    decodeURIComponent('%')
}catch (error) {
    console.log("Caught a URIError:", error.message)
}

//Eval Error: Errors in the eval() function
try{
    throw new EvalError('Custom eval error')
} catch(error){
    console.log("Caught an EvalError:", error.message)
}

//Aggregate Errors: Used with Promise.all() when multiple errors occur
async function testError(){
    try{
        await Promise.all([
            Promise.reject(new Error("Error 1")),
            Promise.reject(new Error("Error 2"))
        ])
    } catch (error) {
        console.log("Caught an Aggregate Error:", error.errors)
    }
}
testError()