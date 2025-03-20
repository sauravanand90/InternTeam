const arr=[1,2,3,4,5]
arr
arr.map((num)=> num*3) //[3,6,9,12,15]

for(var i=0;i<5;i++)
console.log("node");

function add(a,b) {return a+b;} add(10,50) //60

//global objects 
console.log("Process ID:",process.pid); //Process ID: 5404
console.log("Node.js Version:", process.version); //Node.js Version: v22.14.0

const buffer = Buffer.from('Hello Node.js');
console.log(buffer); //<Buffer 48 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73>

setTimeout(() => {
    console.log("This runs after 2 seconds");
}, 2000);

setInterval(() => {
    console.log("This runs every 3 seconds");
}, 3000);

const myURL = new URL('https://www.example.com/?name=anjali');
console.log(myURL.searchParams.get('name'));  
myURL.searchParams.append('age', '30'); //adds age =30 in the url
console.log(myURL.href); // output : https://www.example.com/?name=anjali&age=30

const encoder = new TextEncoder();
const encoded = encoder.encode("Hello, Node.js!");
console.log(encoded)

/* Uint8Array(15) [
    72, 101, 108, 108, 111,
    44,  32,  78, 111, 100,
   101,  46, 106, 115,  33
 ] */


   const builtinModules = require('repl')._builtinLibs;
   console.log(builtinModules);

/* [
  'assert',             'assert/strict',       'async_hooks',
  'buffer',             'child_process',       'cluster',
  'console',            'constants',           'crypto',
  'dgram',              'diagnostics_channel', 'dns',
  'dns/promises',       'domain',              'events',
  'fs',                 'fs/promises',         'http',
  'http2',              'https',               'inspector',
  'inspector/promises', 'module',              'net',
  'os',                 'path',                'path/posix',
  'path/win32',         'perf_hooks',          'process',
  'punycode',           'querystring',         'readline',
  'readline/promises',  'repl',                'stream',
  'stream/consumers',   'stream/promises',     'stream/web',
  'string_decoder',     'sys',                 'timers',
  'timers/promises',    'tls',                 'trace_events',
  'tty',                'url',                 'util',
  'util/types',         'v8',                  'vm',
  'wasi',               'worker_threads',      'zlib'
] */
