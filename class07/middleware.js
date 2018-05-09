var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(cookieParser());


app.all('*', (req, res) => {
    /*
    console.log(JSON.stringify(req.body, 0, 2));
    res.end('I got this data from post: '+ JSON.stringify(req.body, 0, 2));
    */
   res.cookie('rememberme', '1', { expires: new Date(Date.now()+900000)} );
   res.end('cookies sent:' + JSON.stringify(req.cookies, 0, 2));
});


app.listen(4200);