var express = require('express');
var redis = require('redis');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var routes = require('./routes/index');
var users = require('./routes/users');
var flash = require('connect-flash');
var expressValidator = require('express-validator')


if(process.env.REDIS_URL){
    var client = redis.createClient(process.env.REDIS_URL);
}
else{
    var client = redis.createClient();
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser('yoursecret'));
app.use(session(
    {
        secret: 'yourothersecretcode', 
        store:  new redisStore({host: process.env.REDIS_URL || 'localhost', port: 6379, client: client}),
        saveUninitialized: false, 
        resave: false
    }

));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(process.env.PORT || 5000);


module.exports = app;
