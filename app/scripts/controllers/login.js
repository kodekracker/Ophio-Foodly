'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ophioFoodly
 */
angular.module('ophioFoodly')
  .controller('LoginCtrl', function ($scope, $location) {
        $scope.healthy = function(){
            $location.path('/healthy');
        };
  });
