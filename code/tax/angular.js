var app = angular.module('IncomeTaxes', []);

app.controller('IncomeTaxController', function ($scope, IncomeTaxFactory) {
    $scope.schedules = [];
    $scope.scheduleNames = [];
    IncomeTaxFactory.loadSchedules(function (data) {
        $scope.schedules = data;
        $scope.schedules.forEach(function (schedule) {
            if ($scope.scheduleNames.indexOf(schedule.status) === -1) {
                $scope.scheduleNames.push(schedule.status);
            }
        });
    });

    $scope.selectSchedule = function () {

        if ($scope.schedule && $scope.income) {
            $scope.schedules.forEach(function (schedule) {
                if (
                    schedule.status === $scope.schedule && (
                        (schedule.lowerBound < $scope.income && schedule.upperBound > $scope.income) ||
                        (schedule.lowerBound < $scope.income && schedule.upperBound === null)
                    )
                ) {
                    $scope.selectedSchedule = schedule;
                    $scope.taxTotal = (($scope.income - schedule.lowerBound) * schedule.taxRate) + schedule.baseAmount;
                }
            });
        }
    };
});

app.factory('IncomeTaxFactory', function ($http) {
    return {
        loadSchedules: function (callback) {
            $http.get('../json/FederalTaxes2013.json').success(callback);
        }
    };
});

app.filter('percentage', function () {
    return function (input) {
        return input ? (input * 100) + '%' : '0%';
    };
});