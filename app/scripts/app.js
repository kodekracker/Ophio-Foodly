'use strict';

/**
 * @ngdoc overview
 * @name ophioFoodly
 * @description
 * # ophioFoodly
 *
 * Main module of the application.
 */
angular
  .module('ophioFoodly', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/healthy', {
        templateUrl: 'views/healthy.html',
        controller: 'HealthyCtrl'
      })
      .when('/snack', {
        templateUrl: 'views/snack.html',
        controller: 'SnackCtrl'
      })
      .when('/drink', {
        templateUrl: 'views/drink.html',
        controller: 'DrinkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
