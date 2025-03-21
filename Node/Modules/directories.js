const fs = require('fs');

//CREATING A DIRECTORY
fs.mkdir("new-folder", (err) => {
    if(err){ 
        console.error(err);
    } else {
        console.log("Directory created!");
    }
});

//REMOVING THE PREVIOUSLY CREATED DIRECTORY
// fs.rmdir("new-folder", (err) => {
//     if(err){
//         console.error(err);
//     } else {
//         console.log("Directory removed!");
//     }
// });