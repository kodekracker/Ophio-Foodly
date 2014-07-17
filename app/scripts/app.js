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
    'ngStorage'
  ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      authenticationRequired: true
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/category/:category', {
      templateUrl: 'views/category.html',
      controller: 'CategoryCtrl',
      authenticationRequired: true
    })
    .otherwise({
      redirectTo: '/home'
    });
});

app.service('settings', function (){
  this.FIREBASE_URL = 'https://ophiofoodly.firebaseio.com/';
  this.AUTH_TOKEN_LENGTH = 299;
  this.LOGIN_PROVIDER = 'google';
  this.CHECK_EMAIL_SUFFIX = true;
  this.REQUIRED_EMAIL_SUFFIX = '@ophio.co.in';
  this.isEmailAllowed = function(email){
    var suffix = this.REQUIRED_EMAIL_SUFFIX;
    return email.match(suffix+'$')[0] === suffix;
  };
});

app.service('AuthenticationService',function(settings, $localStorage, $firebaseSimpleLogin, $location){
  this.isLoggedIn = function(){
    var token =  this.getAuthToken();
    return Boolean(token);
  };

  this.getAuthToken = function(){
    if(typeof $localStorage.user !== 'undefined'){
      var token =  $localStorage.user.firebaseAuthToken;
      if(typeof token !== 'undefined'){
        return token;
      }
    }
    return null;
  };

  this.getCurrentUser = function(){
    if(this.isLoggedIn){
      return $localStorage.user;
    }
    else{
      alert('Your session has expired, Please login again.');
      $location.path('/login');
    }
  };

  this.tryLogin = function(){
    var loginRef = $firebaseSimpleLogin(new Firebase(settings.FIREBASE_URL));
    loginRef.$login(settings.LOGIN_PROVIDER, {
      rememberMe: true,
    }).then(function(user){
      console.log(user);
      if(settings.isEmailAllowed(user.email)){
        $localStorage.user = user;
        $location.path('/home');
      }
      else{
        alert('Logging in with this email is not allowed');
        $location.path('/login');
      }
    }, function(error){
      alert(error);
    });
  };
});

app.run(function($rootScope,$location,AuthenticationService ){
  $rootScope.$on('$routeChangeStart', function (event, toRoute, fromRoute) {
    // if target route requires auth and user is not logged in
    if(toRoute.authenticationRequired && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
    }
  });

});
