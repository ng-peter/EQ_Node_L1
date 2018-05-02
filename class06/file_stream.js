var fs = require('fs');

var content = '';

var rs = fs.createReadStream('test.txt');

rs.on('readable', ()=>{
    var str;
    var data = rs.read();
    if(data){
        if(typeof data == 'string'){
            str = data;
        } else if (typeof data == 'object' && data instanceof Buffer){
            str = data.toString('utf8', 0, data.length);
        }
        if(str){
            content += str;
        }
    }
});

rs.on('end', ()=>{
    console.log('read in text content:');
    console.log(content.toString('utf8'));
});


rs.on('error', (err)=>{
    console.log('error reading file', JSON.stringify(err));
});


var b = new Buffer(10000);
var str1 = "hello world";
b.write(str1);

console.log(str1.length);
console.log(b.length);


var str2 = "çƒ";

console.log(str2.length);
console.log(Buffer.byteLength(str2));
