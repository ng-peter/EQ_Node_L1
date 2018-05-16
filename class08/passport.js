var express = require('express');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var flash = require('express-flash');

var app = express();

app.use(flash());
app.use(session({
    secret: 'eqnode',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 900000, secure: false } //false for dev only
}));
app.use(cookieParser('eqnode'));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//1. store user names and passwords
//a database would usually be used
var users = {
    "id123" : { id:123, username:'user', password:'pw' },
    "id1" : { id:1, username:'admin', password:'password' }
};

//2. configure passport-local to validate the incoming username/pw

passport.use(new LocalStrategy(
    function (username, password, done) {
        var user;
        for(userid in users){
            user = users[userid];
            if(user.username.toLowerCase() == username.toLowerCase()){
                if(user.password == password){
                    return done(null, user);
                }
            }
        }
        return done(null, false, { message: 'Incorrect Credentials' });
    }
));

//3. serialize users

passport.serializeUser((user, done) => {
    if (users['id'+user.id]) {
        done(null, 'id'+user.id);
    } else {
        done(new Error('CANNOT_SERIALIZE_THIS_USER'));
    }
})

//4. deserialize users

passport.deserializeUser((userid, done) => {
    if(users[userid]) {
        done(null, users[userid]);
    } else {
        done(new Error('THAT_USER_DOESNT_EXIST'));
    }
})

app.get('/', (req, res) => {
    console.log(req.flash());
    res.send('<a href="/login">Login here</a>');
})

app.get('/login', (req, res) => {
    var error = req.flash("error");
    var form = `<form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="text" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>`;
    if(error && error.length){
        form = "<em> " + error[0] + "</em><br/>" + form;
    }
    res.send(form);
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/members',
    failureRedirect: '/login',
    successFlash: { message: 'welcome back' },
    failureFlash: true
}));

app.get('/members', authOrNot, (req, res) => {
    console.log(req.flash('success'));
    res.end('Members area!');
})

function authOrNot(req, res, next){
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.listen(4200);