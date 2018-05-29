var express = require('express');
var https = require('https');
var fs = require('fs');

var privateKey = fs.readFileSync('privkey.pem').toString();
var certificate = fs.readFileSync('newcert.pem').toString();

var options = {
    key: privateKey,
    cert: certificate
}

var app = express();

app.get('*', (req, res) => {
    res.end('secure!');
});

var port_number = 8443;
https.createServer(options, app).listen(port_number, () => {
    console.log(`express server listening on port: ${port_number}`);
})


