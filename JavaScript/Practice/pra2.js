let a = 4, flag=0
let b = 1001
for(let i=0; i<=b/2; i++){
    if(i*i == b){
        flag =1
    }
}
if(flag==1){
    console.log("Perfect square")
}else{
    console.log("Not a Perfect square")
}