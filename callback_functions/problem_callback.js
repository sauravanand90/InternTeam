//removing negative numbers in an array using callback functions

const array1=[-4,-3,-1,10,2,4,-10,50];
console.log("actual array\n"+array1);
const posnumber=removeneg(array1, (x)=> x>=0);

function removeneg(numbers,callback1) {
    const output=[];
    for(const x of numbers)
        {
            if(callback1(x))
                output.push(x);
        }
    return output;
}
console.log("after removing negative numbers\n"+posnumber);