var app = angular.module('kerrywpowell', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/views/profile.html',
            controller: 'ProfileController'
        }).
        when('/resume', {
            templateUrl: '/views/resume.html',
            controller: 'ResumeController'
        }).
        when('/portfolio', {
            templateUrl: '/views/portfolio.html',
            controller: 'PortfolioController'
        });
});

app.controller('ProfileController', function ($scope) {
    $('.nav-link').removeClass('selected');
    $('.profile').addClass('selected');
});

app.controller('ResumeController', function ($scope) {
    $('.nav-link').removeClass('selected');
    $('.resume').addClass('selected');
});

app.controller('appController', function ($scope) {

});