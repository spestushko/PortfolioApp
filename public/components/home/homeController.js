app.controller('homeController', function($rootScope, $scope, $location, $http, session){
  console.log('[homeController.js] - loginController - Scope is up');
  // Restore auth data from session
  session.restoreFromSession($rootScope);
});


