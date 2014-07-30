'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the angularAppApp
 */

app.controller('DashboardCtrl', function ($scope, loader, settings, $filter, $firebase, $routeParams) {
    // firebase code
    var firebaseRef = new Firebase(settings.FIREBASE_URL);
    var database = $firebase(firebaseRef);


    var getTodaysVotes = function(){
      var todayDate = $filter('date')(new Date(), 'yyyy-MM-dd');
      var todaysVotes = database.votes[todayDate]
      return todaysVotes;
    };

    $scope.todaysVotes = '';
    $scope.averageVotes = {};
    $scope.chartCategory = $routeParams['category'];
    $scope.temp = {};
    $scope.temp.loadingChartData = loader.getChartvalue();

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

    database.$on('loaded', function(){
      loader.setChartvalue(false);
      $scope.temp.loadingChartData = loader.getChartvalue();
      $scope.$apply();

      // get today votes and draw chart
      $scope.todaysVotes = getTodaysVotes();
      $scope.setDailyChartData();

      // calculate all votes of each items
      $scope.calculate();
      $scope.setAverageChartData();

    });

    $scope.setDailyChartData = function(){
      for (var key in $scope.todaysVotes) {
                var item = {
                    'c':[
                        { 'v': $scope.todaysVotes[key].item_name},
                        { 'v': $scope.getVoteCount($scope.todaysVotes[key]) }
                    ]
                };
                $scope.chartObjectDaily.data['rows'].push(item);
        }
    };

    $scope.setAverageChartData = function(){
      for (var item_name in $scope.averageVotes) {
                var item = {
                    'c':[
                        { 'v': item_name },
                        { 'v': $scope.averageVotes[item_name] }
                    ]
                };
                $scope.chartObjectAll.data['rows'].push(item);
        }
    };

    $scope.calculate = function(){
      var items = database.availableItems;
      var totalVotes = database.votes;
      _.each(items, function(item, item_id){
          var totalItemVotes = 0;
          _.each(totalVotes, function(votes, date){
              if(_.has(votes, item_id)){
                totalItemVotes += $scope.getVoteCount(votes[item_id]);
              }
          });
          $scope.averageVotes[item.name] = totalItemVotes;
      });
    };
    $scope.getVoteCount = function(itemVotesDict){
      return _.keys(itemVotesDict).length-1;
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
