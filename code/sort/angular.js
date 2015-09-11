var app = angular.module('AngularSort', []);

app.controller('SortController', function ($scope, SortFactory) {
    $scope.presidents = [];
    $scope.sortArray = ['order'];

    SortFactory.loadPresidents(function (data) {
        $scope.presidents = data;
        $scope.sortConfig = [{
            field: 'order',
            direction: 'ASC'
        }];
    });

    $scope.updateSort = function (event, key) {
        var elClassList = event.target.classList;
        if (elClassList.contains('asc')) {
            $scope.sortArray.splice($scope.sortArray.indexOf(key), 1);
        } else if(elClassList.contains('desc')) {
            $scope.sortArray.splice($scope.sortArray.indexOf('-'+key), 1);
            $scope.sortArray.push(key);
        } else {
            $scope.sortArray.push('-'+key);
        }
    };
});

app.factory('SortFactory', function($http) {
    return {
        loadPresidents: function(callback) {
            $http.get('../json/USPresidents.json').success(callback);
        }
    };
});