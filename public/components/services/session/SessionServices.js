app.service('session', function ($rootScope) {
  /*
  * Function, to restore session data
  * to $rootScope
  */
  this.restoreFromSession = function ($rootScope) {
    // Being stored as a string, we have to check it this way
    // lesson learnt from IdeaRising project :|
    if (sessionStorage.authStatus == 'true')
        $rootScope.authenticatedUser.authStatus = true;
    // Retoring username from session
    $rootScope.authenticatedUser.username = sessionStorage.username;
    // Restoring user role from session
    $rootScope.authenticatedUser.role = sessionStorage.role;
    // Restoring user id from session
    $rootScope.authenticatedUser.id = sessionStorage.id;
  };

  /*
  * Function, to sav data in session
  */
  this.saveToSession = function ($rootScope) {
    // Setting to rootScope user attribute status
    sessionStorage.authStatus = $rootScope.authenticatedUser.authStatus;
    // Saving rest of thr data to rootScope from session
    sessionStorage.username = $rootScope.authenticatedUser.username;
    // Saving user role to session
    sessionStorage.role = $rootScope.authenticatedUser.role;
    // Saving user id to session
    sessionStorage.id = $rootScope.authenticatedUser.id;
  };

  /*
  * Function, to reset session data to default
  */
  this.resetSession = function () {
    // Resetting sessionStorage data
    sessionStorage.username   = undefined;
    sessionStorage.authStatus = undefined;
    sessionStorage.role       = undefined;
  };
});

/*
 * Service, tobe run, whenever user wants to sign out
 * from his account, and all related functions to it
*/
app.service('signout', function ($rootScope, session) {
  /*
   * Function, to delete all the user related data
   * from his current session
  */
  this.logout = function ($rootScope, session) {
    // Reset session data
    session.resetSession();
    // Deleting $rootScope data
    $rootScope.authenticatedUser.authStatus = false;
    // Resetting authenticated username from root scope
    $rootScope.authenticatedUser.username = '';
    // Resetting authenticated user role from root scope
    $rootScope.authenticatedUser.role = '';
  };
});