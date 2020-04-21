var imgur = require('imgur');
let fs = require('fs')
let btoa = require('btoa')

// Setting
imgur.setClientId('390277fdd42f174');
var cid = imgur.getClientId();
console.log("CLIENT ID IS");
console.log(cid);

// let sample1 = fs.readFileSync('./photos/2020-04-21T11:07:40.097Z_obat_keras.png') //binary
let sample0 = fs.readFileSync('/home/sandboxadmin/PROJECTS/HACKTIV8/PHASE2R/ECommerce-CMS-Server/photos/2020-04-21T12:41:09.901Z_obat_keras.png',
{ encoding: 'base64' })
// console.log(Buffer.isEncoding(sample1));
// console.log(typeof sample1);
// console.log(Buffer.isBuffer(sample1));
// let s2 = btoa(sample1)
// console.log(typeof s2)
// console.log(s2);

// console.log("THE BINARY FILE IS");
// console.log(sample1);

// console.log("\N \N THE BASE-64 FILE IS");
// console.log(sample2);

// imgur.uploadBase64(s2)
imgur.uploadBase64(sample0)
.then(function (json) {
    console.log(json.data);
})
.catch(function (err) {
    console.error(err.message);
});