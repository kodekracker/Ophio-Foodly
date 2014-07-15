'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ophioFoodly
 */

var app  = angular.module('ophioFoodly');
app.controller('LoginCtrl',
   function ($scope, settings, AuthenticationService) {
    $scope.login = function(){
      return AuthenticationService.tryLogin();
    };
  }
);
