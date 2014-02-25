var app = angular.module('kerrywpowell');

app.controller('PortfolioController', function ($scope, $compile, PortfolioFactory) {
    $('.nav-link').removeClass('selected');
    $('.portfolio').addClass('selected');

    $scope.projectPics = [];
    $scope.visiblePics = [];

    $scope.expandableClick = function ($event) {
        if (!$($event.target).hasClass('expanded')) {
            $($event.target).siblings('ul').show();
            $($event.target).attr('data-icon', '-');
            $($event.target).addClass('expanded');
        } else {
            $($event.target).siblings('ul').hide();
            $($event.target).attr('data-icon', '+');
            $($event.target).removeClass('expanded');
        }
    };

    $scope.showPics = function (key, numberOfPics, $event) {
        $('.button-left').css('visibility', 'hidden');
        $scope.projectPics = [];
        $('.pictures').css('display', 'inline-block');
        $('.code').css('visibility', 'hidden');
        $('.pictures .large .large-image').attr('src', '/styles/images/projects/' + key + '/1.PNG');
        var count = 0,
            file;

        while (count <= numberOfPics) {
            file = count + 1;
            $scope.projectPics.push({url: '/styles/images/projects/' + key + '/' + file + '.PNG'});
            count += 1;
        }

        $scope.visiblePics = angular.copy($scope.projectPics);
        $scope.visiblePics = $scope.visiblePics.splice(0, 3);
        setTimeout(function () {
            $($('.thumbs img')[0]).addClass('selected');
        }, 100);
        $('nav .selected').removeClass('selected');
        $($event.target).addClass('selected');
    };

    $scope.loadPic = function (url, $event) {
        $('.pictures .large .large-image').attr('src', url);
        $('img.selected').removeClass('selected');
        $($event.target).addClass('selected');
    };

    $scope.navThumbsRight = function () {
        var mostRight = $scope.visiblePics[$scope.visiblePics.length - 1],
            mostRightObject = $.grep($scope.projectPics, function (a) { return a.url === mostRight.url; })[0],
            index = $scope.projectPics.indexOf(mostRightObject),
            projectPics = angular.copy($scope.projectPics);

        $scope.visiblePics = projectPics.splice(index - 1, 3);
        $('.button-left').css('visibility', 'visible');
        if (!$scope.projectPics[index + 4]) {
            $('.button-right').css('visibility', 'hidden');
        }
    };

    $scope.navThumbsLeft = function () {
        var mostLeft = $scope.visiblePics[0],
            mostLeftObject = $.grep($scope.projectPics, function (a) { return a.url === mostLeft.url; })[0],
            index = $scope.projectPics.indexOf(mostLeftObject),
            projectPics = angular.copy($scope.projectPics);

        $scope.visiblePics = projectPics.splice(index - 1, 3);
        $('.button-right').css('visibility', 'visible');
        if (!$scope.projectPics[index - 2]) {
            $('.button-left').css('visibility', 'hidden');
        }
    };

    $scope.showCode = function (code, type, needsLibrary, $event) {
        $('.code').css('visibility', 'visible');
        $('.pictures').css('display', 'none');
        $('.code .tabs').empty();
        $('.code .details').empty();
        $('nav .selected').removeClass('selected');
        $($event.target).addClass('selected');
        var libraryCallback = function () {
                PortfolioFactory.getFileAsText('/code/' + code + '/' + type + '.js', function (data) {
                    if (data) {
                        var html;
                        if (needsLibrary) {
                            html = $('<span ng-click="tabClick($event)">' + type + '.js</span>');
                        } else {
                            html = $('<span ng-click="tabClick($event)" class="active">' + type + '.js</span>');
                        }
                        $('.code .tabs').append(html);
                        $('.code .details').append('<div class="detail">' + data + '</div>');
                        $compile(html)($scope);
                    }

                    PortfolioFactory.getFileAsText('/code/styles/sass/app.scss', function (data) {
                        if (data) {
                            var html = $('<span ng-click="tabClick($event)">app.scss</span>');
                            $('.code .tabs').append(html);
                            $('.code .details').append('<div class="detail">' + data + '</div>');
                            $compile(html)($scope);
                        }

                        PortfolioFactory.getFileAsText('/code/' + code + '/' + type + '.html', function (data) {
                            if (data) {
                                var html = $('<span ng-click="tabClick($event)">' + type + '.html</span>'),
                                    html2;
                                $('.code .tabs').append(html);
                                $('.code .details').append('<div class="detail"><textarea disabled="disabled">' + data + '</textarea></div>');
                                $compile(html)($scope);

                                html = $('<span ng-click="tabClick($event)">Preview</span>');
                                html2 = $('<div class="detail"><button class="new-tab" ng-click="newTab(\'/code/' + code + '/' + type + '.html\')">Full Page</button><br/><iframe src="/code/' + code + '/' + type + '.html"/></div>');
                                $('.code .tabs').append(html);
                                $('.code .details').append(html2);
                                $compile(html)($scope);
                                $compile(html2)($scope);
                            }
                        });
                    });
                });
            };

        if (needsLibrary) {
            PortfolioFactory.getFileAsText('/code/' + code + '/' + code + '.js', function (data) {
                if (data) {
                    var html = $('<span class="active" ng-click="tabClick($event)">' + code + '.js</span>');
                    $('.code .tabs').append(html);
                    $('.code .details').append('<div class="detail">' + data + '</div>');
                    $compile(html)($scope);

                    libraryCallback();
                }
            });
        } else {
            libraryCallback();
        }
    };

    $scope.tabClick = function ($event) {
        var index = $('.tabs span').toArray().indexOf($event.target);
        $('.code .detail').hide();
        $($('.code .detail')[index]).show();
        $('.code .active').removeClass('active');
        $($event.target).addClass('active');
    };

    $scope.newTab = function (url) {
        window.open(url);
    };

    $scope.viewGit = function () {
        window.open('https://github.com/powellkerry/Portfolio');
    };
});