var app = angular.module('kerrywpowell');

app.factory('PortfolioFactory', function($http) {
    return {
       getFileAsText: function(url, callback) {
            $http.get(url).success(callback)
       }
    }
})