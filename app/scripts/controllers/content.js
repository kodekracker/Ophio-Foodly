/*global Firebase*/

'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the ophioFoodly
 */
app.controller('ContentCtrl', function ($scope, $location,$routeParams,$firebase, OPHIO_CONST, OphioLocalStorage) {

    var fbref = new Firebase(OPHIO_CONST.FBURL);
    var itemStoreRef = fbref.child('ItemsStore');
    var voteStoreRef = fbref.child('Votes');
    var userId = OphioLocalStorage.getValue(OPHIO_CONST.AUTH_ID);

    $scope.tabCategory = $routeParams['category'];
    $scope.addItemButton = true;
    $scope.addItemBox = false;
    $scope.Items = $firebase(itemStoreRef);
    
    $scope.

    $scope.showAddItemBox = function(){
        $scope.addItemButton = false;
        $scope.addItemBox = true;
    };

    $scope.hideAddItemBox = function(){
        $scope.addItemButton = true;
        $scope.addItemBox = false;
    };

    $scope.userCanVote = function(votedUsers){
        console.log(votedUsers);
        if(_.indexOf(votedUsers, userId) < 0)
            return true;
        else
            return false;
    };

    $scope.upVoteItem = function(item){
        var itemRef = getItemRef(item.id);
        itemRef.once('value', function(data){
            var votedUsers = data.val()
            if(votedUsers===null){
                alert('voted');
                itemRef.set([userId]);
            }else{
                if($scope.userCanVote(votedUsers)){
                   alert('voted');
                   votedUsers.push(userId);
                   itemRef.update(votedUsers);
                }else{
                    alert('already voted');
                }
            }
        });
    };

    $scope.addNewItem = function(itemName){
        if (itemName) {  
            var newItemId = getNewId();
            var newItem = itemStoreRef.child(newItemId);
            newItem.set(
            {   
                id: newItemId, 
                name : itemName ,
                category : $scope.tabCategory
            });
            $scope.hideAddItemBox();
            $scope.itemName = '';
        };
    };

    function getNewId(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    };

    function getDate(date){
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var today = date.getFullYear() + "-" + (month) + "-" + (day);
        return today;
    }

    function getItemRef(itemId){
        var todayDate = getDate(new Date());

        var listRef = voteStoreRef.child(todayDate);
        listRef.once('value',function(data){
            if(data.val() === null){
                listRef.set(todayDate);
            }
        });

        var itemRef = listRef.child(itemId);
        return itemRef;
    }

  });
