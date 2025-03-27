const path=require('path');
console.log(__dirname);

console.log(__filename);

const filePath=path.join("folder","teachers","data.txt");
//makes sure that it createsthe directory with correct type of forward -windows or backword-mac or linux slashes
console.log(filePath);

const parseData=path.parse(filePath); // retrieves the detailed info abt the directries
const resolvePath=path.resolve(filePath); //absolute path from the beginning
const extName=path.extname(filePath);
const baseName=path.basename(filePath);
const dirName=path.dirname(filePath);

console.log({parseData,resolvePath,extName,baseName,dirName, seperator:path.sep});
//path.sep shows which kind of slashes are being used in the system