'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the ophioFoodly
 */
app.controller('ContentCtrl', function ($scope, $location, ItemsStore, Users,$routeParams) {

    $scope.tabCategory = $routeParams['category'];
    $scope.addItemButton = true;
    $scope.addItemBox = false;
    $scope.orderbyvote = 'upvotes';
    $scope.Items = ItemsStore;
    $scope.user = Users[1];

    $scope.showAddItemBox = function(){
        $scope.addItemButton = false;
        $scope.addItemBox = true;
    };

    $scope.hideAddItemBox = function(){
        $scope.addItemButton = true;
        $scope.addItemBox = false;
    };

    $scope.userCanVote = function(item){
        if($.inArray(item.id,$scope.user.votes) < 0)
            return true;
        else
            return false;
    };

    $scope.upVoteItem = function(item){
        if($scope.userCanVote(item)){
            item.upvotes++;
            $scope.user.votes.push(item.id);
        }
    };

    $scope.addNewItem = function(itemName){
        if (itemName) {
            $scope.Items.push({ id: getNewId($scope.Items), name : itemName , upvotes : 0 , category : $scope.tabCategory});
            $scope.hideAddItemBox();
            $scope.itemName = '';
        };
    };

    function getNewId(array){
        return array.length;
    }

  });
