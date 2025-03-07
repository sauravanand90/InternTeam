setTimeout(function() { myFunction("Hello World!!"); }, 3000);

function myFunction(value) {
  console.log(value)
}

// Another example of setTimeout
function getData(dataId){
    setTimeout(()=>{
        console.log("data : ", dataId)
    }, 2000)
}
