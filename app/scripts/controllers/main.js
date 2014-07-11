/*global Firebase*/
'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ophioFoodly
 */
 app.controller('MainCtrl', function ($scope,$location) {
    $scope.show = function(url){
        $location.path(url);
    };
  });
