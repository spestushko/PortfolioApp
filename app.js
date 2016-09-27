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

// Initizlize mongoose and it's schemas
// ============================================================= 
const fileName = 'app.js';
const functionName = 'Main'

// Initizlize utilities used by application
// ============================================================= 
log = require('./util/logger/logger');
if (log) log.out('info', fileName, functionName, 'Logger module is loaded');
else log.out('error', fileName, functionName, 'Error loading logger module');

// Initizlize mongoose and it's schemas
// ============================================================= 
require('./models/users.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/PortfolioApp');
var dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'connection error:'));
dbConn.once('open', function(callback){
  log.out('info', fileName, functionName, 'Connection to mongodb established');
});

// Initizlize backend routes for the application
// ======================================= ====================== 
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/api/auth/auth')(passport);
if (routes) log.out('info', fileName, functionName, 'routes - Route initialized');
else log.out('error', fileName, functionName, 'routes - Route NOT initialized');
if (users) log.out('info', fileName, functionName,  'users  - Route initialized');
else log.out('error', fileName, functionName, 'users - Route NOT initialized');
if (auth) log.out('info', fileName, functionName,   'auth   - Route initialized');
else log.out('error', fileName, functionName, 'auth - Route NOT initialized');

// Initialize the express application
// ============================================================= 
var app = express();

// Session configuration
// ============================================================= 
app.use(session({
  name: 'Session',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true,
  //store: sessionStore, // connect-mongo session store ?? what about it ??
}));

// View engine setup
// ============================================================= 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initialize express configuration of the application
// ============================================================= 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: 524288000 }));
app.use(bodyParser.urlencoded(({ limit: 524288000, extended: true })));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initiate passport
// ============================================================= 
app.use(passport.initialize());
app.use(passport.session());

// Associate routes with url paths
// ============================================================= 
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// Initizlize Passport
// ============================================================= 
var initPassport = require('./passport-init');
initPassport(passport);

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

// Export app varable as an indication of server startup
// ============================================================= 
log.out('info', fileName, functionName, 'Exporting app - Server started');
module.exports = app;
