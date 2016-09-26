app.controller('contactController', function($rootScope, $scope, $location, $http, session){
  console.log('[contactController.js] - contactController - Scope is up');
  // Restore auth data from session
  session.restoreFromSession($rootScope);
});