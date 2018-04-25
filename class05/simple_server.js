var http = require('http');

function process_request(request, result) {
    var body = 'you have reached the server';
    var content_length = body.length;
    result.writeHead(200,{
        'Content-Length': content_length,
        'Content-Type': 'text/plain'
    });
    result.end(body);
}


var server = http.createServer(process_request);

server.listen(4200);