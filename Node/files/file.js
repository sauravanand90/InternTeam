// const fs = require("fs");

// // Asynchronous read
// fs.readFile("input.txt", function (err, data) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("Asynchronous read: " + data.toString());
// });

// type="commonjs" in package.json

const fs = require("fs");

// Synchronous read
const data = fs.readFileSync('input.txt');
console.log("Synchronous read: " + data.toString());
