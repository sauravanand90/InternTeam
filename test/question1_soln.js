function hollow_pyramid(n){
    for(let i=1;i<=n;i++)
        {
            for(let j=i;j<=n;j++)
                {
                    if(i==1 || j==i || j==n)
                        process.stdout.write("*");
                    else
                        process.stdout.write(" ");
                }
           process.stdout.write("\n");//console.log("\n"): alone cannot take to next line so use process.stdout.write
        }
    process.stdout.write("\n");
}
hollow_pyramid(6);
hollow_pyramid(2);
hollow_pyramid(3);
hollow_pyramid(4);

//time= O(n^2)
//space=O(1)