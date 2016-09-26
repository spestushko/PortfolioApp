var route = angular.module('route', ['ngRoute']);
route.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'components/home/homeTemplate.html',
      controller: 'homeController',
      requireLogin: false,
    })
    .when('/login', {
      templateUrl: 'components/login/loginTemplate.html',
      controller: 'loginController',
      requireLogin: false,
    })
    .when('/signup', {
      templateUrl: 'components/signup/signupTemplate.html',
      controller: 'signupController',
      requireLogin: false,
    })
    /*
    .when('/about', {
      templateUrl: 'components/about/aboutTemplate.html',
      controller: 'aboutController',
    })
    */
    .when('/contact', {
      templateUrl: 'components/contact/contactTemplate.html',
      controller: 'contactController',
      requireLogin: false,
    })
    .otherwise({ redirectTo: '/' });
});
