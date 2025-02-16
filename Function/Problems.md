**1. Reverse a number**
```
function reverseNum(num) {
  let reverse = 0
  while(num != 0)
  {
    let digit = num % 10
    reverse = reverse * 10 + digit
    num = Math.floor(num/10) 
  }
  return reverse
}
console.log(reverseNum(123)) 
console.log(reverseNum(5872))
```
