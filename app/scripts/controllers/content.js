'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:ContentCtrl
 * @description
 * # ContentCtrl
 * Controller of the ophioFoodly
 */
app.controller('ContentCtrl', function ($scope, $location, ItemsStore, Users, Tabs) {
    $scope.showIt = false;
    $scope.orderbyvote = 'upvotes';
    $scope.Items = ItemsStore;
    $scope.user = Users[1];
    $scope.currentTab = null;

    setCurrentTab();

    $scope.show = function(){
      $scope.showIt = true;
    };

    $scope.upVote = function(item){
        var cat = item.category.toLowerCase();
        if(!$scope.user[cat]){
            item.upvotes++;
            $scope.user[cat] = true;
        }

    };

    $scope.newItem = function(itemName){
        $scope.counter++;
        var cat = $scope.currentTab['title'];
        $scope.Items.push(  { id: getId($scope.Items), name : itemName , upvotes : 0 , category : cat   } );
        $scope.showIt = false;
        $scope.itemName = '';
    };

    function getId(array){
        return array.length;
    }

    function setCurrentTab(){
        var title = $location.path().substring(1);
        if(title=="healthy")
            $scope.currentTab = Tabs[0];
        else if(title=="snacks")
            $scope.currentTab = Tabs[1];
        else if(title=="drinks")
            $scope.currentTab = Tabs[2];
    }
  });
