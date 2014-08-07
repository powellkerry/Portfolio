var app = angular.module('AngularFilter', []);

app.controller('FilterController', function ($scope, FilterFactory) {
    $scope.presidents = [];

    FilterFactory.loadPresidents(function (data) {
        $scope.presidents = data;
    });
});

app.factory('FilterFactory', function ($http) {
    return {
        loadPresidents: function (callback) {
            $http.get('../json/USPresidents.json').success(callback);
        }
    };
});