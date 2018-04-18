var fs = require('fs');

var file = fs.openSync('obj-es5.js', 'r');
var buf = new Buffer(10000);
var read_so_far = fs.readSync(file, buf, 0, 10000);

console.log(buf.toString('utf8', 0, read_so_far));

fs.closeSync(file);

console.log('done');