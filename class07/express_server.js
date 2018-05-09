var express = require('express');

var app = express();

var path = require('path');

app.use(require('morgan')('dev'));
//same as:
/*
var morgan = require('morgan');
app.use(morgan());
*/
app.use(require('response-time')());

app.use(express.static(path.join(__dirname, '../class06')));




app.use((req, res, next) => {
    if(req.url == '/stop'){
        res.end('stop');
    } else {
        console.log('keep going');
        next();
    }
})






// app.method(url_regex, optional_function, handler_function(req, res, next))

app.all('/admin/home', check_login, welcome_admin);


function check_login(req, res, next){
    if(isAdmin()){
        next();
    } else {
        res.end('not an admin');
    }
}

function welcome_admin(req, res, next){
    res.end('welcome back');
}

function isAdmin(){
    return false;
}


// app.method(url_regex, optional_function, handler_function(req, res, next))

app.all('*', (req, res, next) => {
    console.log('new page requested');
    next();
});

app.post('/', (req, res) => {
    res.end('it works! post data');
});

app.get('/content[s]?/:id/:item.json', (req, res) => {
    res.end('it works! get data: '+req.params.id+" / "+req.params.item);
});

app.get('/user[s]?', (req, res) => {
    console.log('user page accessed');
});

app.get('/user[s]?/:id', (req, res, next) => {
    if(parseInt(req.params.id) < 1000){
        next();
    }
    res.end('new function! get data: '+req.params.id);
});

app.get('/user[s]?/:id', (req, res) => {
    res.end('legacy function! get data: '+req.params.id);
});

app.all('*', (req, res) => {
    res.end('404 no page match');
})




app.listen(4200);