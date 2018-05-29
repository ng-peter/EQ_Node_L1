var express = require('express');
var evh = require('express-vhost');

var one = express();
one.get('*', (req, res) => {
    res.end('1\n');
})
var two = express();
two.get('*', (req, res) => {
    res.end('2\n');
})
var three = express();
three.get('*', (req, res) => {
    res.end('3\n');
})

var master_app = express();
master_app.use(evh.vhost());


evh.register('app1', one);
evh.register('app2', two);
evh.register('app3', three);


master_app.listen(4200);

















