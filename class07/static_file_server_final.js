var http = require('http');
var fs = require('fs');
var path = require('path');

function handle_request (req, res){
    if (req.method.toLowerCase() == 'get' && req.url.substring(0,9) == '/content/'){
        //write a function for handling static data
        serve_static_file(req.url.substring(9), res)
    } else {
        res.writeHead(404, {'Content-Type':'application/json'});
        var out = { error: 'not_found', message: req.url+' not found'};
        res.end(JSON.stringify(out));
    }
}

function serve_static_file(filename, res){
    console.log(filename);
    
    var rs = fs.createReadStream(filename);
    
    res.writeHead(200, { 'Content-Type': content_type_for_path(filename) });
    
    rs.pipe(res);

    rs.on('end', ()=>{
        res.end();
    })
    rs.on('error', (err)=>{
        console.log(err);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        var out = { error: 'not_found', message: filename + ' was not found' };
        res.end(JSON.stringify(out));
    })
}

function content_type_for_path(filename){
    var ext = path.extname(filename);
    switch(ext.toLowerCase()){
        case '.html': return 'text/html';
        case '.txt': return 'text/plain';
        case '.css': return 'text/css';
        case '.js': return 'application/json';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}


var server = http.createServer(handle_request);
server.listen(4200);
