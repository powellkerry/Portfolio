var app = angular.module('GovData', []);

app.controller('GovDataController', function ($scope) {
    $scope.agencies = [];
    $scope.years = [1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
    $scope.year = 2014;
    $scope.detail = 'agencyData';

    $scope.syncAgencyState = function (event) {
        spending.render($scope.detail);
    };

    $scope.loadData = function () {
        d3.csv('data/outlays.csv', function (error, root) {
            root.sort(function (a, b) {
                var val = 0;
                if (a['Agency Name'] > b['Agency Name']) {
                    val = 1;
                }
                if (a['Agency Name'] < b['Agency Name']) {
                    val = -1;
                }
                return val;
            });
            spending.data = root;
            $scope.loadAgencies(root);
            $scope.filterByAgency(root);
            $scope.filterByBureau(root);
            $scope.filterByAccount(root);
            $scope.getTotalSpent(root);
            spending.render(['agencyData']);
        });
    };

    $scope.refresh = function () {
        $scope.loadAgencies(spending.data);
        $scope.filterByAgency(spending.data);
        $scope.filterByBureau(spending.data);
        $scope.filterByAccount(spending.data);
        $scope.getTotalSpent(spending.data);
        spending.render();
    };

    $scope.loadAgencies = function (data) {
        data.forEach(function (d) {
            if ($scope.agencies.indexOf(d['Agency Name']) === -1) {
                $scope.agencies.push(d['Agency Name']);
            }
        });
    };
    $scope.filterByAgency = function (data) {
        var agencies = [];
        if ($scope.agency) {
            spending.agencyData = [];
        }
        data.forEach(function (d) {
            if (agencies.indexOf(d['Agency Name']) === -1) {
                if (!$scope.agency || $scope.agency === d['Agency Name']) {
                    agencies.push(d['Agency Name']);
                    spending.agencyData.push(
                        {
                            name: d['Agency Name'],
                            abbr: $scope.getUppercaseCharacters(d['Agency Name']),
                            amount: parseFloat(d[$scope.year].replace(',', ''))
                        }
                    );
                }
            } else {
                var index = agencies.indexOf(d['Agency Name']);
                spending.agencyData[index].amount += parseFloat(d[$scope.year].replace(',', ''));
            }
        });
    };
    $scope.filterByBureau = function (data) {
        var bureaus = [];

        if ($scope.agency) {
            spending.bureauData = [];
        }

        data.forEach(function (d) {
            if (bureaus.indexOf(d['Bureau Name']) === -1) {
                if (!$scope.agency || $scope.agency === d['Agency Name']) {
                    bureaus.push(d['Bureau Name']);
                    spending.bureauData.push(
                        {
                            name: d['Agency Name'] + '-' + d['Bureau Name'],
                            abbr: $scope.getUppercaseCharacters(d['Agency Name']),
                            amount: parseFloat(d[$scope.year].replace(',', ''))
                        }
                    );
                }
            } else {
                var index = bureaus.indexOf(d['Bureau Name']);
                spending.bureauData[index].amount += parseFloat(d[$scope.year].replace(',', ''));
            }
        });
    };
    $scope.filterByAccount = function (data) {
        if ($scope.agency) {
            spending.accountData = [];
        }
        data.forEach(function (d) {
            if (!$scope.agency || $scope.agency === d['Agency Name']) {
                spending.accountData.push(
                    {
                        name: d['Agency Name'] + '-' + d['Bureau Name'] + '-' + d['Account Name'],
                        abbr: $scope.getUppercaseCharacters(d['Agency Name']),
                        amount: parseFloat(d[$scope.year].replace(',', ''))
                    }
                );
            }
        });
    };

    $scope.getUppercaseCharacters = function (str) {
        var upchars = '', i;
        for (i = 0; i < str.length; i += 1) {
            if (str.charAt(i) === str.charAt(i).toUpperCase() && str.charAt(i) !== ' ') {
                upchars = upchars + str.charAt(i);
            }
        }
        return upchars;
    };

    $scope.getTotalSpent = function (data) {
        var total = 0, i;
        for (i = 0; i < data.length; i += 1) {
            if (!$scope.agency || $scope.agency === data[i]['Agency Name']) {
                total = total + parseFloat(data[i][$scope.year].replace(',', ''));
            }
        }
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.totalSpent = spending.format(total);
            });
        }, 500);
    };

    $scope.loadData();

});