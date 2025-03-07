let arr1 = [[4,1,2], [7,4,4], [3,7,4]]
let arr2 = [[1,2], [3,4]]
function wave(arr){
    let m = arr.length
    let n = arr[0].length
    let ans = " "
    for (let i=0; i<n; i++){
        if(i%2==0){
            for(let j=0; j<=m-1; j++){
                ans += arr[j][i] + " "
            }
        }else{
            for(let j=m-1; j>=0; j--){
                ans += arr[j][i] + " "
            }
        }
    }
    console.log(ans)
}
wave(arr1)
wave(arr2)