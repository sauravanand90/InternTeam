const getPromise = ()=>{
    return new Promise((resolve, reject) => {
        console.log("I am a promise")
        resolve("success")
        //reject("error")
    })
}
let promise = getPromise()
//Automatically a parameter is passed in the function to access the value of resolve and reject
promise.then((res) => {                
    console.log("Promise fulfilled", res)
})

promise.catch((err) => {
    console.log("Some error occurred", err)
})