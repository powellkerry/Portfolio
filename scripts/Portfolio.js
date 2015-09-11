angular.module('Portfolio', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'tpl/about.html'
            })
            .when('/portfolio', {
                templateUrl: 'tpl/about.html'
            })
            .when('/about', {
                templateUrl: 'tpl/about.html'
            })
            .when('/work', {
                templateUrl: 'tpl/work.html'
            })
            .when('/code', {
                templateUrl: 'tpl/code.html'
            })
            .when('/hire', {
                templateUrl: 'tpl/hire.html'
            })
    })
    .run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.$on('$locationChangeSuccess', function() {
            $rootScope.path = $location.path();
        })
    }]);