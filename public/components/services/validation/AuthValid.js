app.service('validation', function () {
  /*
  * Function, to restore session data
  * to $rootScope
  */
  this.checkLogin = function (user) {
    var res = {
      valid:true, 
      message:'OK'
    };
    if (user.username.trim() == '' || user.password.trim() == '') {
      res.valid = false; 
      res.message = 'Please, fill in requried fields';
      return res;
    }
    if (user.username.trim().length < 6 || user.username.trim().length > 32) {
      res.valid = false; 
      res.message = 'Username length must be from 6 to 32 symbols';
      return res;
    }
    if (user.password.trim().length < 6 || user.password.trim().length > 128) {
      res.valid = false; 
      res.message = 'Password length must be from 6 to 32 symbols';
      return res;
    }
    return res;
  };

  /*
  * Function, to sav data in session
  */
  this.checkSignup = function (user, pass) {
    var res = {
      valid:true, 
      message:'OK'
    };
    if (user.username.trim() == '' || user.password.trim() == '' || 
        pass.trim() == '') {
      res.valid = false; 
      res.message = 'Please, fill in required fields';
      return res;
    }
    if (user.username.trim().length < 6 || user.username.trim().length > 32) {
      res.valid = false; 
      res.message = 'Username length must be from 6 to 32 symbols';
      return res;
    }
    if (user.password.trim().length < 6 || user.password.trim().length > 128) {
      res.valid = false; 
      res.message = 'Password length must be from 6 to 32 symbols';
      return res;
    }
    if (user.password.trim() != pass.trim()) {
      res.valid = false; 
      res.message = 'Passwords have to match';
      return res;
    }
    return res;
  };

});