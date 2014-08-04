/*global Firebase*/

'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the ophioFoodly
 */

app.controller('CategoryCtrl',
  function ($scope, $timeout, loader, settings, AuthenticationService, $filter, $routeParams, $firebase) {
    var firebaseRef = new Firebase(settings.FIREBASE_URL);
    var itemStoreRef = firebaseRef.child('availableItems');
    var voteStoreRef = firebaseRef.child('votes');

    var getTodaysVoteRef = function(){
      var todayDate = $filter('date')(new Date(), 'yyyy-MM-dd');
      var voteRef = voteStoreRef.child(todayDate);
      return voteRef;
    };

    $scope.temp = {};
    $scope.temp.addingItem = false;
    $scope.temp.newItemName = '';
    $scope.temp.loadingData = loader.getloadvalue();
    $scope.temp.currentCategory = $routeParams.category;

    $scope.availableItems = $firebase(itemStoreRef).$asObject();
    $scope.todaysVotes = $firebase(getTodaysVoteRef()).$asObject();
    $scope.categories = [
      {href: 'healthy', title: 'Healthy Bites'},
      {href: 'snacks', title: 'Snacks'},
      {href: 'drinks', title: 'Drinks'},
      {href: 'dashboard/daily', title: 'Dashboard'}
    ];

    var checkConnection = function(){
      if(!navigator.onLine){
        $('.connectionalert').modal({
          backdrop: 'static',
          show: true
        });
        $timeout(checkConnection, 1000);
      }
      else{
        $('.connectionalert').modal('hide');
      }
    };

    if(!navigator.onLine){
      $timeout(checkConnection, 1000);
    }

    $scope.currentUser = AuthenticationService.getCurrentUser();

    $scope.availableItems.$loaded().then(function() {
      loader.setloadvalue(false);
      $scope.temp.loadingData = loader.getloadvalue();
    });

    $scope.getVoteCount = function(itemVotesDict){
      return _.keys(itemVotesDict).length;
      // console.log(itemVotesDict);
    };

    $scope.upVoteItem = function(itemId, item){
      console.log(itemId);
      var d = new Date();
      var vhr = d.getHours();
      var vmin = d.getMinutes();
      if (vhr >=10 && vhr <= 17 ) {
        var votes_ref = getTodaysVoteRef();
        var item_ref = votes_ref.child(itemId);
        var itemVotes = $firebase(item_ref).$asObject();
        var vote = $firebase(item_ref.child($scope.currentUser.id)).$asObject();
        vote.createdAt = new Date().toISOString();
        vote.username = $scope.currentUser.displayName;
        vote.$save();
      }
      else{
        $('.votealert').modal('toggle');
      }
    };

    $scope.addNewItem = function(){
      var item = {
        name: $scope.temp.itemName,
        category: $scope.temp.currentCategory,
        createdBy: $scope.currentUser.id,
        creatorName: $scope.currentUser.displayName
      };

      $scope.availableItems.$add(item);
      $scope.temp.itemName = '';
      $scope.temp.addingItem = false;
    };
  }
);
