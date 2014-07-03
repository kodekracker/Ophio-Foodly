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
    'ngTouch'
  ]);

app.config(function ($routeProvider) {
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
      templateUrl: 'views/content.html',
      controller: 'ContentCtrl'
    })
    .when('/snacks', {
      templateUrl: 'views/content.html',
      controller: 'ContentCtrl'
    })
    .when('/drinks', {
      templateUrl: 'views/content.html',
      controller: 'ContentCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}).directive('smallHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'views/header.html'
  };
});

app.factory("ItemsStore", function(){
  return  [
      {
          id: 0,
          name: "Pizza",
          upvotes : 8,
          category : "healthy"
      },
      {
          id: 1,
          name: "Chips",
          upvotes : 10,
          category : "snacks"
      },
      {
          id: 2,
          name: "Bear",
          upvotes : 3,
          category : "drinks"
      },
      {
          id: 3,
          name: "Pdgadgadg",
          upvotes : 8,
          category : "healthy"
      },
      {
          id: 4,
          name: "Chipsaag",
          upvotes : 10,
          category : "snacks"
      },
      {
          id: 5,
          name: "Bear12",
          upvotes : 8,
          category : "snacks"
      },
      {
          id: 6,
          name: "Pizza12",
          upvotes : 5,
          category : "healthy"
      },
      {
          id: 7,
          name: "Chips123",
          upvotes : 2,
          category : "snacks"
      },
      {
          id: 8,
          name: "Bear123",
          upvotes : 12,
          category : "drinks"
      }
  ];
});

app.factory("Users",function(){
  return [
      {
        id : 0,
        name : "Tester 1",
        healthy : false,
        snacks : false,
        drinks : false
      },
      {
        id : 1,
        name : "Tester 2",
        healthy : true,
        snacks : false,
        drinks : true
      }
  ];
});

app.factory("Tabs", function(){
  return [
      {
        id : 1,
        title : "healthy",
        category : "healthy"
      },
      {
        id : 2,
        title : "snacks",
        category : "snacks"
      },
      {
        id : 3,
        title : "drinks",
        category : "drinks"
      }
  ];
});
