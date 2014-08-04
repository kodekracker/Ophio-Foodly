'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the angularAppApp
 */

app.controller('DashboardCtrl', function ($scope, loader, settings, $filter, $firebase, $routeParams, $timeout) {

    var firebaseRef = new Firebase(settings.FIREBASE_URL);
    var itemStoreRef = firebaseRef.child('availableItems');
    var voteStoreRef = firebaseRef.child('votes');

    var getTodaysVoteRef = function(){
      var todayDate = $filter('date')(new Date(), 'yyyy-MM-dd');
      var voteRef = voteStoreRef.child(todayDate);
      return voteRef;
    };

    $scope.todaysVotes = '';
    $scope.averageVotes = {};
    $scope.chartCategory = $routeParams['category'];
    $scope.temp = {};
    $scope.temp.loadingChartData = loader.getChartvalue();

    // var checkConnection = function(){
    //   if(!navigator.onLine){
    //     $('.connectionalert').modal({
    //       backdrop: 'static',
    //       show: true
    //     });
    //     $timeout(checkConnection, 1000);
    //   }
    //   else{
    //     $('.connectionalert').modal('hide');
    //   }
    // };

    // if(!navigator.onLine){
    //   $timeout(checkConnection, 1000);
    // }

    $firebase(firebaseRef).$asObject().$loaded().then(function(){
      loader.setChartvalue(false);
      $scope.temp.loadingChartData = loader.getChartvalue();
      $scope.availableItems = $firebase(itemStoreRef).$asArray();
      $scope.availableItemsObj = $firebase(itemStoreRef).$asObject();
      $scope.totalVotes = $firebase(voteStoreRef).$asArray();

      // get today votes and draw chart
      $scope.todaysVotes = $firebase(getTodaysVoteRef()).$asArray();
      $scope.todaysVotes.$loaded().then(function(){
        $scope.setDailyChartData();
        // calculate all votes of each items
        $scope.calculate();
        $scope.setAverageChartData();
      });
    });

    $scope.setDailyChartData = function(){
      _.each($scope.todaysVotes, function(vote) {
        console.log(vote);
        var itemId = vote.$id;
        var item = {
          'c':[
            { 'v': $scope.availableItemsObj[itemId].name },
            { 'v': $scope.getVoteCount(itemId) }
          ]
        };
        console.log(item);
        $scope.chartObjectDaily.data.rows.push(item);
      });
    };

    $scope.setAverageChartData = function(){
      _.each($scope.averageVotes, function(avg_votes, item_name){
        var item = {
          'c':[
            { 'v': item_name },
            { 'v': avg_votes }
          ]
        };
        $scope.chartObjectAll.data.rows.push(item);
      });
    };

    $scope.calculate = function(){
      var items = $scope.availableItems;
      var totalVotes = $scope.totalVotes;
      _.each(items, function(item){
          var totalItemVotes = 0;
          _.each(totalVotes, function(vote){
              if(_.has(vote, item.$id)){
                totalItemVotes += $scope.getVoteCount(item);
              }
          });
          $scope.averageVotes[item.name] = totalItemVotes;
      });
    };

    $scope.getVoteCount = function(itemVotesDict){
      return _.keys(itemVotesDict).length;
    };

    // chart code
    $scope.chartObjectDaily = {};
    $scope.chartObjectAll = {};

    $scope.chartObjectDaily.data = {"cols": [
        {id: "t", label: "Item Name", type: "string"},
        {id: "s", label: "Votes", type: "number"}
    ], "rows": []};

    $scope.chartObjectAll.data = { "cols" : [
        {id: "t", label: "Item Name", type: "string"},
        {id: "s", label: "Votes", type: "number"}
    ], "rows": []};

    // $routeParams.chartType == BarChart or PieChart or ColumnChart...
    $scope.chartObjectDaily.type = 'BarChart';
    $scope.chartObjectDaily.options = {
        'title': 'Audience Poll'
    };

    $scope.chartObjectAll.type = 'BarChart';
    $scope.chartObjectAll.options = {
        'title': 'Overall Statistics'
    };
});
