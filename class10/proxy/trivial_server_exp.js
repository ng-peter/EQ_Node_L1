var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var port_number = process.argv[2];

var app = express()
    .use(cookieParser())
    .use(session({
        secret: 'secret things',
        cookie: { maxAge: 900000 },
        resave: false,
        saveUninitialized: true
    }))
    .use((req, res) => {
        console.log(`request on port ${port_number}`)
        var x = req.session.last_access;
        req.session.last_access = new Date();
        res.end(`page ${port_number} last accessed at: ${x}`);
    })
    .listen(port_number);


