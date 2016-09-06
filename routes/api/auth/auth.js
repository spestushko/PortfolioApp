var express = require('express');
var router  = express.Router();

module.exports = function (passport) {
  // sends success login state
  router.get('/success', function (req, res) {
    req.session.userId = req.user._id;
    req.session.userRole = req.user.private.role;
    res.send({ state: 'success', user: req.user ? req.user : null });
  });

  // sends failure login state
  router.get('/failure', function (req, res) {
    res.send({ state: 'failure', user: null, message: 'Invalid username or password' });
  });

  // sign in
  router.post('/signin', passport.authenticate('signin', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
  }));

  // sign up
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
  }));

  //log out
  router.get('/signout', function (req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/#login');
  });
  return router;
};