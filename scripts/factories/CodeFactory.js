app.factory('CodeFactory', function($http) {
    return {
        loadCode: function(url, callback) {
            $http.get(url).success(callback);
        }
    };
});