var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
// q
mongoose.Promise = require('q').Promise;
// native promises
mongoose.Promise = global.Promise;

var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
const fileName = 'passport-init.js';

module.exports = function (passport) {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function (user, done) {
    const functionName = 'passport.serializeUser';
    log.out('info', fileName, functionName, 'serializing user:' + user.public.email);
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      const functionName = 'passport.deserializeUser';
      log.out('info', fileName, functionName, 'deserializing user:' + user.public.email);
      done(err, user);
    });
  });

  passport.use('signin', new LocalStrategy({passReqToCallback: true,},function (req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ public: { email:  username } }, function (err, user) {
      // In case of any error, return using the done method
      if (err) return done(err);
      // Username does not exist, log the error and redirect back
      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false);
      }
      // User exists but wrong password, log the error
      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false); // redirect back to login page
      }
      // User and password both match, return user from done method
      // which will be treated like success
      return done(null, user);
    });
  }));

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true,},function (req, username, password, done) {
    const functionName = 'passport.signup'; 
    log.out('info', fileName, functionName, 'function call init');
    User.findOne({ profile: { email:  username }}).exec()
    .then(function(newUser) {
      log.out('info', fileName, functionName, 'Query returned a promise');
      if (!newUser) {
        log.out('warn', fileName, functionName, 'User already exists: '+newUser.email);
        return done(null, false);
      } 
      log.out('info', fileName, functionname, 'Creating new user');
      // set the user's local credentials
      newUser.public.email = username;
      newUser.private.password = createHash(password);
      newUser.private.role = 'member';
      return newUser.save();
    })
    .then(function(newUser){
      log.out('info', fileName, functionname, 'NEW username:' + newUser.public.email);
      log.out('info', fileName, functionname, 'NEW role:' + newUser.private.role);
      return done(null, newUser);
    })
    .catch(function(err){
      log.out('error', fileName, functionname, err);
      return done(err);
    });
  }));

  // Checking if password is correct
  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.private.password);
  };

  // Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
