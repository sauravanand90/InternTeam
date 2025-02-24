arr1=[1 ,2 ,3 ,4, 5]
arr2=[10,50,40,80]
function get_min_max(arr)
{
    min=Infinity
    max=-Infinity;
    for(let ele of arr){
        if(ele<min)
            min=ele;
        if(ele>max)
            max=ele;
    }
    console.log("min="+min+" max="+ max);
}
get_min_max(arr1);
get_min_max(arr2);

//time= O(n)


arr1=[1 ,2 ,3 ,4, 5]
arr2=[10,50,40,80]
function get_min_max(arr)
{
    // min=Infinity
    // max=-Infinity;
    min=Math.min(...arr);
    max=Math.max(...arr);
    console.log("min="+min+" max="+ max);
}
get_min_max(arr1);
get_min_max(arr2);


arr1=[1 ,2 ,3 ,4, 5]
arr2=[10,50,40,80]
function get_min_max(arr)
{
    arr=arr.sort((a,b)=>a-b)
    min=arr[0];
    max=arr[arr.length-1];
    console.log("min="+min+" max="+ max);
}
get_min_max(arr1);
get_min_max(arr2);
//time=O(nlogn) incase of merge sort 
