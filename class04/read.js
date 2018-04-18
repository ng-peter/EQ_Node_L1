var fs = require('fs');

var buf = new Buffer(10000);

fs.open('text2.txt', 'r', function(err, handle){
    if(err){
        console.log('err', err.code, ':', err.message);
        return;
    }
    fs.read(handle, buf, 0, 10000, null, function(err, length){
        if(err){
            console.log('err', err.code, ':', err.message);
        } else {
            console.log(buf.toString('utf8', 0, length));
            fs.close(handle, () => {} );
        }
    });
});

/*
try{
    setTimeout(()=>{ throw new Error('some error'); }, 4000);
}catch(err){
    console.log(err.message);
}
*/


console.log('done');

