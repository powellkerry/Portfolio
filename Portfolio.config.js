var app = angular.module('Portfolio', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/tpl/about.html'
        })
        .when('/about', {
            templateUrl: '/tpl/about.html'
        })
        .when('/work', {
            templateUrl: '/tpl/work.html'
        })
        .when('/code', {
            templateUrl: '/tpl/code.html'
        })
        .when('/hire', {
            templateUrl: '/tpl/hire.html'
        })
});