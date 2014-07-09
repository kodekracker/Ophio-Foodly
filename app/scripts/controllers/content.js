/*global Firebase*/

'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the ophioFoodly
 */
app.controller('ContentCtrl', function ($scope, $location, ItemsStore, Users,$routeParams, FBURL, $firebase) {

    var fbref = new Firebase(FBURL);
    var itemRef = fbref.child('ItemsStore');
    var userRef = fbref.child('Users');

    $scope.test = $firebase(itemRef);
    $scope.useractive = $firebase(userRef);
/*    $scope.testing = function(){
        $scope.useractive.$add(
            {
                id : 1,
                name : "Tester 2",
                votes : ["-1"]
            }
        );
        console.log($scope.useractive);
    };
*/
    $scope.tabCategory = $routeParams['category'];
    $scope.addItemButton = true;
    $scope.addItemBox = false;
    $scope.orderbyvote = 'upvotes';
    $scope.Items = $scope.test;
    $scope.user = $scope.useractive[0];

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
            var ivote = item.upvotes++;
            $scope.item.$update({upvotes: ivote});
            $scope.user.votes.$add(item.id);
        }
    };

    $scope.addNewItem = function(itemName){
        if (itemName) {
            $scope.Items.push({ id: getNewId($scope.Items), name : itemName , upvotes : 0 , category : $scope.tabCategory});
            $scope.test.$add(
            {   
                id: getNewId($scope.Items), 
                name : itemName ,
                upvotes : 0 ,
                category : $scope.tabCategory
            });
        
            $scope.hideAddItemBox();
            $scope.itemName = '';
        };
    };

    function getNewId(array){
        return array.length;
    }

  });
