const fs = require('fs');
fs.appendFile("testFile.txt","\nCreation of this test file is successfully executed!", (err) => {
    if(err){
        console.error("Error appending file:", err);
        return;
    }else{
        console.log("Text appended successfully!");
    }
});