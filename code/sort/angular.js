var app = angular.module('AngularSort', []);

app.controller('SortController', function ($scope, SortFactory) {
    $scope.presidents = [];

    SortFactory.loadPresidents(function (data) {
        $scope.presidents = data;
        $scope.sortConfig = [{
            field: 'order',
            direction: 'ASC'
        }];
    });

    $scope.sort = function (event, key) {
        var found = false;
        for (var i=0; i < this.sortConfig.length; i++) {
            var obj = this.sortConfig[i];
            if (obj.field === key) {
                found = true;
                if (event.target.classList.contains('asc')) {
                    event.target.classList.remove('asc');
                    this.sortConfig.splice(i, 1);
                } else if (event.target.classList.contains('desc')) {
                    event.target.classList.add('asc');
                    event.target.classList.remove('desc');
                    this.sortConfig[i].direction = 'ASC';
                } else {
                    event.target.classList.add('desc');
                    this.sortConfig[i].direction = 'DESC';
                }
            }
        }
        if (!found) {
            event.target.classList.add('desc');
            this.sortConfig.push({
                direction: 'DESC',
                field: key
            });
        }
        $scope.presidents = sort.sortObjectArray($scope.presidents, $scope.sortConfig);
    };
});

app.factory('SortFactory', function($http) {
    return {
        loadPresidents: function(callback) {
            $http.get('../json/USPresidents.json').success(callback);
        }
    };
});