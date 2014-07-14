'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ophioFoodly
 */

var app  = angular.module('ophioFoodly');

app.controller('HomeCtrl',
  function ($scope,$location) {
    $scope.show = function(url){
      $location.path(url);
    };
  }
);
