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

**2. Count vowel**
```
function countVowel(str) {
  var count = 0
  for(var i=0;i<str.length;i++){
    if(str.charAt(i)=="a"||str.charAt(i)=="e"||str.charAt(i)=="i"||str.charAt(i)=="o"||
       str.charAt(i)=="u"||str.charAt(i)=="A"||str.charAt(i)=="E"||str.charAt(i)=="I"||
       str.charAt(i)=="O"||str.charAt(i)=="U"){
       count++
    }
  }
  return count
}
console.log(countVowel("Hello")) 
console.log(countVowel("Harman"))
```
