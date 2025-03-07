let arr1 = [1, 2, 3, 4, 5]
let arr2 = [10, 50, 40, 80]

// let max1 =INT_MIN, min1 = INT_MAX
// let max2 = INT_MIN, min2=INT_MAX

let max1 =0, min1=5
let max2 =0, min2=80

for(let i=0; i<arr1.length; i++){
    if(arr1[i]>=max1){
        max1 = arr1[i]
    }
    if(arr1[i]<=min1){
        min1 = arr1[i]
    }
}
for(let i=0; i<arr2.length; i++){
    if(arr2[i]>=max2){
        max2 = arr2[i]
    }
    if(arr2[i]<=min2){
        min2 = arr2[i]
    }
} 
console.log(max1, min1)
console.log(max2, min2)
