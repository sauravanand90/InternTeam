function wave_matrix(arr)
{
    for(let j=0;j<arr.length;j++)
        {
            if(j%2==0)// even column numbers print from top to bottom
            {
                for(let i=0;i<arr.length;i++)
                    process.stdout.write(arr[i][j]+" ");
            }
            else// odd column numbers go from bottom to up
            {
                for(let i=arr.length-1;i>=0;i--)
                    process.stdout.write(arr[i][j]+" ");
            }            
        }
    process.stdout.write("\n");
}
arr1=[[4,1,2],[7,4,4],[3,7,4]];
arr2=[[1,2],[3,4]];
wave_matrix(arr1);
wave_matrix(arr2);
