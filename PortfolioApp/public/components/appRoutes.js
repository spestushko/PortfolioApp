var route = angular.module('route', ['ngRoute']);
route.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'components/home/homeTemplate.html',
      controller: 'homeController',
    })
    .when('/login', {
      templateUrl: 'components/login/loginTemplate.html',
      controller: 'loginController',
    })
    /*
    .when('/about', {
      templateUrl: 'components/about/aboutTemplate.html',
      controller: 'aboutController',
    })
    .when('/contact', {
      templateUrl: 'components/contact/contactTemplate.html',
      controller: 'contactController',
    })
    */
    //.otherwise({ redirectTo: '/' });
});
