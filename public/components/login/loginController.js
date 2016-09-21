app.controller('loginController', function($rootScope, $scope, $http, $location){
  console.log('[loginController.js] - loginController - Scope is up');
  $scope.user = {username:'', password:''};
  $scope.login = function() {
  	$http.post('/auth/signin', $scope.user).success(function(data){
  		if (data.state == 'success') 
  			console.log('All good');
  		else 
  			console.log('There is a bobo, check server logs:' + data.message);
  	});
  }
});
