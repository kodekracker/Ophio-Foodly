/*global Firebase*/

'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the ophioFoodly
 */
app.controller('ContentCtrl', function ($scope, $filter, $location,$routeParams,$firebase, OPHIO_CONST, OphioLocalStorage) {

    var fbref = new Firebase(OPHIO_CONST.FBURL);
    var itemStoreRef = fbref.child('ItemsStore');
    var voteStoreRef = fbref.child('Votes');
    $scope.userId = OphioLocalStorage.getValue(OPHIO_CONST.AUTH_ID);

    $scope.categories = [
        {href: 'healthy', title: 'Healthy Bites'},
        {href: 'snacks', title: 'Snacks'},
        {href: 'drinks', title: 'Drinks'}
    ];

    var getTodaysVoteRef = function(){
        var todayDate = $filter('date')(new Date(), 'yyyy-MM-dd');
        var voteRef = $firebase(voteStoreRef.child(todayDate));
        return voteRef;
    };

    $scope.getVoteCount = function(itemVotesDict){
        return _.keys(itemVotesDict).length;
    };


    $scope.tabCategory = $routeParams['category'];
    $scope.Items = $firebase(itemStoreRef);
    $scope.todayVotes = getTodaysVoteRef();
    $scope.temp = {};
    $scope.temp.addingItem = false;
    $scope.temp.itemName = '';
    $scope.sortorder = 'name';


    $scope.upVoteItem = function(item_id){
        var itemVotes = $scope.todayVotes.$child(item_id);
        var vote = itemVotes.$child($scope.userId);
        vote.createdAt = new Date();
        vote.$save();
    };

    $scope.addNewItem = function(){
        var item = {
            name: $scope.temp.itemName,
            category: $scope.tabCategory,
            createdBy: $scope.userId
        }
        $scope.Items.$add(item);
        $scope.temp.itemName = '';
        $scope.temp.addingItem = false;
    };
  });
