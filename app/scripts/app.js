'use strict';

/**
 * @ngdoc overview
 * @name ophioFoodly
 * @description
 * # ophioFoodly
 *
 * Main module of the application.
 */
var app  = angular.module('ophioFoodly', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'LocalStorageModule'
  ]);

app.run(function($rootScope,$location,AuthenticationService ){
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    // if route requires auth and user is not logged in
    // !routeClean($location.url())
    if (next.authenticationRequired && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      $location.path('/login');
    }
  });

});
app.config(function ($routeProvider,localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('OphioFoodly');
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      authenticationRequired: true
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/cat/:category', {
      templateUrl: 'views/content.html',
      controller: 'ContentCtrl',
      authenticationRequired: true
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('OPHIO_CONST', {
  'FBURL': 'https://ophio-foodly.firebaseio.com/',
  'AUTH_TOKEN' : 'authToken',
  'AUTH_ID' : 'authId'
  }
);


app.service("userlogged", function () {
   var id = null;
   var name = null;
   var providerName = null;    

});
app.service('AuthenticationService',function(OphioLocalStorage,OPHIO_CONST){
  this.isLoggedIn = function(){
    var token =  OphioLocalStorage.getValue(OPHIO_CONST.AUTH_TOKEN);
    if(token===null)
      return false;
    else
      return true;
  };
});

app.service('OphioLocalStorage', function(localStorageService){
  this.getValue = function(key){
   return localStorageService.get(key);
  };
  this.setValue = function(key,value){
    localStorageService.set(key,value);
  };
  this.removeValue = function(key){
    localStorageService.remove(key);
  };
  this.removeAll = function(){
    localStorageService.clearAll();
  };
});