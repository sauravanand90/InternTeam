const fs = require('fs');
const data = 'Hello, this is a test file!';
fs.writeFile('testfile.txt', data, (err) => {
    if(err){
        console.log('Error writing a file:',err);
    }else{
        console.log('File written successfully!');
    }
});