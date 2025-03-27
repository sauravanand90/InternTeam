const http = require('http');

const server = http.createServer((req, res) => {
    res.write('Hello World!');
    res.end();
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

//for this we need to add type="commonjs" as it doesnt have an import 
// for modules ad type="module" in package.json


              

