// Signup controller used for interaction on the signup page
// =============================================================
app.controller('signupController', function($rootScope, $scope, $http, $location, session, validation){
  console.log('[signupController.js] - signupController - Scope is up');
  $scope.user = { username: '', password: '' };
  $scope.errorMessage = '';
  // Signup method
  $scope.signup = function(){
    var res = validation.checkSignup($scope.user, $scope.test_user.repassword);
    if (res.valid == false) {
      $scope.errorMessage = res.message;
      return;
    }
    $http.post('/auth/signup', $scope.user).success(function(data) {
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
 