var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var app = express();

app.use(morgan('dev'));

app.use(session({
    secret: 'encryptpass',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 900000 }
}));


app.all('*', (req, res) => {
    var x = req.session.last_access;
    req.session.last_access = new Date();
    res.end('you last visited this page: '+ x);
});


app.listen(4200);



