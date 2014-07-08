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
        $scope.login = function(){
            $location.path('/healthy');
        };
  });
