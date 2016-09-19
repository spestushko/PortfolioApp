app.controller('signupController', function($rootScope, $scope, $http, $location){
  console.log('[signupController.js] - signupController - Scope is up');
  $scope.user = { username: '', password: '' };
  /**
  * Method to call upon submit of the function to create a user
  */
  $scope.signup = function(){
  	console.log('User to be created');
    console.log('User data:'+$scope.user);
  	$http.post('/auth/signup', $scope.user).success(function(data) {
      console.log('return call from signup');
  	  if (data.state == 'success')
  	  	$location.path('/');
  	  else 
  	  	console.log('error occured:'+data.message);
  	});
  }
});
