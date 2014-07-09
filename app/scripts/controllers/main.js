/*global Firebase*/
'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ophioFoodly
 */
angular.module('ophioFoodly')
  .controller('MainCtrl', function ($scope,$location) {
    $scope.login = function(){
        $location.path('/login');
    };
  });
