const arr1=[1,2,3,4,5];
const arr2=[10,50,40,80];
    let min=0;
    let max=0;
function getMinMax(arr){
    for(let i=0;i<arr.length;i++){
    if(arr[i]>max)
    {
        max=arr[i];
        }
    min=arr[0];
    if(arr[i]<min)
    {
        min=arr[i];
    }  
} 
     console.log(min+" "+max);
}
getMinMax(arr1);
getMinMax(arr2);

