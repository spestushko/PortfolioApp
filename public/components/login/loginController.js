// Login controller used for interaction on the login page
// =============================================================
app.controller('loginController', function($rootScope, $scope, $http, $location, session){
  console.log('[loginController.js] - loginController - Scope is up');
  $scope.user = {username:'', password:''};
  // Login method

  $scope.login = function() {
  	$http.post('/auth/signin', $scope.user).success(function(data){
  		if (data.state == 'success') {
        // Public accessible data from the back-end
        $rootScope.authenticatedUser.username = data.user.public.email;
        $rootScope.authenticatedUser.company = data.user.public.company;
        $rootScope.authenticatedUser.type = data.user.public.type;
        $rootScope.authenticatedUser.picture = data.user.public.picture;
        // Additional field
        $rootScope.authenticatedUser.authStatus = true;
        $rootScope.authenticatedUser.id = data.user._id;
        session.saveToSession($rootScope);
        $location.path('/');
      } else { 
        $scope.errorMessage = data.message;
      }  
  	});
  }
});
