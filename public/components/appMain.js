var app = angular.module('PortfolioApp', ['route']).run(function($rootScope, $location, $http, signout, 
                                                                  session, validation) {
  console.log('[appMain.js] - Main module - Application initialized');

  // Document representing the authenticated user 
  // ============================================
  $rootScope.authenticatedUser = {
  	username:'',
    company:'',
    type:'',
    picture:'',
    id:'',
    username: '',
    authStatus: false,
  };
  
  // Method to sign user out of the session
  // ============================================
  $rootScope.signUserOut = function () {
    // Firing a get request for back-end
    $http.get('/auth/signout');
    // Clearing user data(session and from root scope)
    signout.logout($rootScope, session);
    $location.path('/buy');
  };

  // Controlling user navigation
  // ============================================
  $rootScope.$on('$routeChangeStart', function (event, next) {
    // Checking if user is athenticated
    if ((!sessionStorage.authStatus || sessionStorage.authStatus == 'undefined')
          && next.requireLogin) {
      $location.path('/login');
    }
  });

  // Accessor for saving id returned from server
  // ============================================
  $rootScope.accessors = {
    getId: function (row) {
      return row._id;
    },
  };

});
