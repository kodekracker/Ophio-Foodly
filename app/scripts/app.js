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
    .when('/:category', {
      templateUrl: 'views/content.html',
      controller: 'ContentCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
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
        votes : []
      },
      {
        id : 1,
        name : "Tester 2",
        votes : []
      }
  ];
});

