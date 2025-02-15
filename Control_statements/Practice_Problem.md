**1. Define three variables for the LaunchCode shuttle---one for the starting fuel level, another for the number of astronauts aboard, and the third for the altitude the shuttle reaches.

Construct while loops to do the following:

Prompt the user to enter the starting fuel level. The loop should continue until the user enters a positive value greater than 5000 but less than 30000.

Use a second loop to query the user for the number of astronauts (up to a maximum of 7). Validate the entry by having the loop continue until the user enters an integer from 1 - 7.

Use a final loop to monitor the fuel status and the altitude of the shuttle. Each iteration, decrease the fuel level by 100 units for each astronaut aboard. Also, increase the altitude by 50 kilometers. (Hint: The loop should end when there is not enough fuel to boost the crew another 50 km, so the fuel level might not reach 0).

After the loops complete, output the result with the phrase, The shuttle gained an altitude of ___ km.

If the altitude is 2000 km or higher, add "Orbit achieved!"

Otherwise add, "Failed to reach orbit."**
```
let fuellevel=0, numast=0, alti=0
while(fuellevel<5000 || fuellevel>30000){
    fuellevel = parseInt(prompt("Enter fuel level : "))
}
while(numast<1 || numast>7){
    numast = parseInt(prompt("Enter fuel level : "))
}
while(fuellevel - 100*numast >= 0){
    alti += 50
    fuellevel -= 100*numast
}
console.log("The shuttle gained an altitude of " + alti)
if(alti>=2000){
    console.log("Orbit achieved!")
}else{
    console.log("Failed to reach orbit.")
}
```
