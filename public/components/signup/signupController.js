app.controller('signupController', function($rootScope, $scope, $http, $location){
  console.log('[signupController.js] - signupController - Scope is up');


  /**
  * Method to call upon submit of the function to create a user
  */
  $scope.signup = function(){
  	console.log('User to be created');
  }
});
