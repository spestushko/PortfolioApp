app.controller('profileController', function($rootScope, $scope, $location, $http, session){
  console.log('[profileController.js] - profileController - Scope is up');
  // Restore auth data from session
  session.restoreFromSession($rootScope);
});