function isPerfectSquare(n){
    if(n<0) return false
    if(n==0 || n==1) return true
    let sqrt = Math.sqrt(n)
    if(sqrt==Math.floor(sqrt)){
        console.log("Perfect Square")
    }else{
        console.log("Not a Perfect Square")
    }
}

isPerfectSquare(4)
isPerfectSquare(1001)