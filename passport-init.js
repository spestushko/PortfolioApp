var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function (user, done) {
    console.log('serializing user:', user.public.email);
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log('deserializing user:', user.public.email);
      done(err, user);
    });
  });

  passport.use('signin', new LocalStrategy({
    passReqToCallback: true,
  },
    function (req, username, password, done) {
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
    }
  ));

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true, //allows us to pass back the entire request to the callback
  },
    function (req, username, password, done) {
      // find a user in mongo with provided username
      User.findOne({ profile: { email:  username } }, function (err, user) {
        // In case of any error, return using the done method
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists with username: ' + email);
          return done(null, false);
        } else {
          // if there is no user, create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.public.email = username;
          newUser.private.password = createHash(password);
          newUser.private.role = 0;
          // save the us1er
          newUser.save(function (err) {
            if (err) {
              console.log('Error in Saving user: ' + err);
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    })
  );

  // Checking if password is correct
  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.private.password);
  };

  // Generates hash using bCrypt
  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
