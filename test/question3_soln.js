function perfect_square(n)
{
    if(n<0 || typeof n !="number")
        return false;
    if(n==1 || n==0)
        return true;
    let square_root=Math.floor(Math.sqrt(n));
    if(square_root*square_root==n)
        console.log("1");
    else
        console.log("0");
}
perfect_square(4);
perfect_square(1001);



//perfect squares can be in this format too
//1+3=4 that is summ of odd numbers
function isPerfectSquare(n) {
    if (n === 0) return true;

    let odd = 1;
    while (n > 0) {
        n -= odd;
        odd += 2;
    }
    return n === 0;
}

const x = 1001;//x=4
if (isPerfectSquare(x)) {
    console.log("1");
} else {
    console.log("0");
}
