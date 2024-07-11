// how nodejs differsn from vanilla js
//  1- nodejs runs on server - not in browser
//  2- nodejs uses commonjs module system - not es6 module system
//  3- nodejs uses require() to import modules - not import
//  4- nodejs uses module.exports to export modules - not export
//  5- nodejs uses global object - not window object
//  7- nodejs uses process object - not document object
//  8- nodejs uses buffer object - not ArrayBuffer object
// 9- has common core modules that we will explore


const os = require('os');
const path = require('path');


console.log(os.type());
console.log(os.version());
console.log(os.platform());
console.log(os.hostname());
console.log(os.homedir());
// console.log(os.cpus());
// console.log(os.freemem());
// console.log(os.totalmem());
// console.log(os.uptime());
// console.log(os.userInfo());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));


console.log(path.parse(__filename));