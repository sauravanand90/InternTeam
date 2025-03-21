const path = require('path');
const filePath = 'user/local/bin/file.txt';  //File path example

console.log('Directory:', path.dirname(filePath));
console.log('Extension:', path.extname(filePath));
console.log('File name:', path.basename(filePath));
console.log('File name without extension:', path.basename(filePath, path.extname(filePath)));

//Concatenate multiple path segments into a single path.
const joinedPath = path.join('/user', 'local', 'bin', 'file.txt');
console.log('Joined Path:', joinedPath);

//Converts a sequence of path segments into an absolute path. Starts from the current working directory if a relative path is provided.
const resolvedPath = path.resolve('file.txt');
console.log('Resolved Path:', resolvedPath);

//Breaks a file path into its components.
const parsedPath = path.parse(filePath);
console.log('Parsed Path:', parsedPath);