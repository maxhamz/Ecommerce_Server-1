var imgur = require('imgur');
let fs = require('fs')

// Setting
imgur.setClientId('390277fdd42f174');


let sample1 = fs.readFileSync('./photos/2020-04-21T09:21:42.110Z_obat_keras.png')
let sample2 = new Buffer(sample1).toString('base64')

console.log("THE BINARY FILE IS");
console.log(sample1);

console.log("\N \N THE BASE-64 FILE IS");
console.log(sample2);