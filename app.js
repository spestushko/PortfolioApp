// Load required dependancies
// =============================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var passport = require('passport');

// Initizlize Passport
// ============================================================= 
var initPassport = require('./passport-init');
initPassport(passport);

// Initizlize mongoose and it's schemas
// ============================================================= 
require('./models/users');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/PortfolioApp');
var dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function(callback){
  console.log('=== connection to mongodb established ===');
});

// Initizlize backend routes for the application
// ============================================================= 
var routes = require('./routes/index');
var users = require('./routes/users');
var auth   = require('./routes/api/auth/auth')(passport);

// Initialize the express application
// ============================================================= 
var app = express();

// View engine setup
// ============================================================= 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initialize express configuration of the application
// ============================================================= 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Associate routes with url paths
// ============================================================= 
app.use('/', routes);
app.use('/users', users);

// Catch 404 and forward to error handler
// ============================================================= 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler: will print stacktrace
// ============================================================= 
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler: no stacktraces leaked to user
// ============================================================= 
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
