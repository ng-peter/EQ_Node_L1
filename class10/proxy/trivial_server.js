var http = require('http');

var s = http.createServer((req, res) => {
    console.log('got a requeste on port:' + process.argv[2]);
    res.end('listen on port:' + process.argv[2]);
});

s.listen(process.argv[2]);