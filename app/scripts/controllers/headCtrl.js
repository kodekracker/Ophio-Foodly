'use strict';

/**
 * @ngdoc function
 * @name ophioFoodly.controller:HealthyCtrl
 * @description
 * # HealthyCtrl
 * Controller of the ophioFoodly
 */
app.controller('headCtrl', function ($scope, $location, ItemsStore, Users, Tabs) {
    $scope.counter=0; 
    $scope.showIt = false;
    $scope.orderbyvote = 'upvotes';
    $scope.Items = ItemsStore;
    $scope.user = Users[1];
    $scope.currentTab = null;

    var title = $location.path().substring(1);
    if(title=="healthy")
        $scope.currentTab = Tabs[0];
    else if(title=="snacks")
        $scope.currentTab = Tabs[1];
    else if(title=="drinks")
        $scope.currentTab = Tabs[2];

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
        $scope.Items.push(  { id: $scope.counter, name : itemName , upvotes : 0 , category : cat   } );
        $scope.showIt = false;
        $scope.itemName = '';
    };    
  });
