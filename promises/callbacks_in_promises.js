const myPromise=new Promise(function(myResolve,myReject){
setTimeout(function(){
    myResolve("hello!!");},3000);
});
myPromise.then(
function(value){
    console.log(value);
});