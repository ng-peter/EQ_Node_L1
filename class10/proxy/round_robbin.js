var http = require('http');
var httpProxy = require('http-proxy')
var fs = require('fs');

var server_list = JSON.parse(fs.readFileSync('server_list.json')).server_list;

// 1. create the proxy server.
var proxy = httpProxy.createProxyServer({});

// 2. create a regular http server on 8080
var s = http.createServer((req, res) => {
    var target = server_list.shift();
    proxy.web(req, res, { target: target });
    server_list.push(target);
});

s.listen(4200);

