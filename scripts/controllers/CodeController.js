angular.module('Portfolio')
    .controller('CodeController', ['$scope', '$filter', 'CodeFactory', function($scope, $filter, CodeFactory) {
        $scope.code;
        $scope.activeTab = '';
        $scope.activeSubTab = '';

        $scope.data = [{
            name: 'Array Filter',
            id: '1',
            tabs:[{
                name: 'Native JS',
                id: '1-1',
                tabs: [{
                    name: 'filter.js',
                    src: 'code/filter/filter.js',
                    type: 'code',
                    id: '1-1-1'
                },{
                    name: 'native.js',
                    src: 'code/filter/native.js',
                    type: 'code',
                    id: '1-1-2'
                },{
                    name: 'native.html',
                    src: 'code/filter/native.html',
                    type: 'code',
                    id: '1-1-3'
                },{
                    name: 'Preview',
                    src: 'code/filter/native.html',
                    type: 'iframe',
                    id: '1-1-4'
                }]
            },{
                name: 'Angular JS',
                id: '1-2',
                tabs: [{
                    name: 'angular.js',
                    src: 'code/filter/angular.js',
                    type: 'code',
                    id: '1-2-2'
                },{
                    name: 'angular.html',
                    src: 'code/filter/angular.html',
                    type: 'code',
                    id: '1-2-3'
                },{
                    name: 'Preview',
                    src: 'code/filter/angular.html',
                    type: 'iframe',
                    id: '1-2-4'
                }]
            },{
                name: 'jQuery',
                id: '1-3',
                tabs: [{
                    name: 'filter.js',
                    src: 'code/filter/filter.js',
                    type: 'code',
                    id: '1-3-1'
                },{
                    name: 'jquery.js',
                    src: 'code/filter/jquery.js',
                    type: 'code',
                    id: '1-3-2'
                },{
                    name: 'jquery.html',
                    src: 'code/filter/jquery.html',
                    type: 'code',
                    id: '1-3-3'
                },{
                    name: 'Preview',
                    src: 'code/filter/jquery.html',
                    type: 'iframe',
                    id: '1-3-4'
                }]
            }]
        },{
            name: 'Array Sorter',
            id: '2',
            tabs:[{
                name: 'Native JS',
                id: '2-1',
                tabs: [{
                    name: 'sort.js',
                    src: 'code/sort/sort.js',
                    type: 'code',
                    id: '2-1-1'
                },{
                    name: 'native.js',
                    src: 'code/sort/native.js',
                    type: 'code',
                    id: '2-1-2'
                },{
                    name: 'native.html',
                    src: 'code/sort/native.html',
                    type: 'code',
                    id: '2-1-3'
                },{
                    name: 'Preview',
                    src: 'code/sort/native.html',
                    type: 'iframe',
                    id: '2-1-4'
                }]
            },{
                name: 'Angular JS',
                id: '2-2',
                tabs: [{
                    name: 'angular.js',
                    src: 'code/sort/angular.js',
                    type: 'code',
                    id: '2-2-2'
                },{
                    name: 'angular.html',
                    src: 'code/sort/angular.html',
                    type: 'code',
                    id: '2-2-3'
                },{
                    name: 'Preview',
                    src: 'code/sort/angular.html',
                    type: 'iframe',
                    id: '2-2-4'
                }]
            },{
                name: 'jQuery',
                id: '2-3',
                tabs: [{
                    name: 'sort.js',
                    src: 'code/sort/sort.js',
                    type: 'code',
                    id: '2-3-1'
                },{
                    name: 'jquery.js',
                    src: 'code/sort/jquery.js',
                    type: 'code',
                    id: '2-3-2'
                },{
                    name: 'jquery.html',
                    src: 'code/sort/jquery.html',
                    type: 'code',
                    id: '2-3-3'
                },{
                    name: 'Preview',
                    src: 'code/sort/jquery.html',
                    type: 'iframe',
                    id: '2-3-4'
                }]
            }]
        },{
            name: 'Income Tax Calculator',
            id: '3',
            tabs:[{
                name: 'Native JS',
                id: '3-1',
                tabs: [{
                    name: 'native.js',
                    src: 'code/tax/native.js',
                    type: 'code',
                    id: '3-1-1'
                },{
                    name: 'native.html',
                    src: 'code/tax/native.html',
                    type: 'code',
                    id: '3-1-2'
                },{
                    name: 'Preview',
                    src: 'code/tax/native.html',
                    type: 'iframe',
                    id: '3-1-3'
                }]
            },{
                name: 'Angular JS',
                id: '3-2',
                tabs: [{
                    name: 'angular.js',
                    src: 'code/tax/angular.js',
                    type: 'code',
                    id: '3-2-1'
                },{
                    name: 'angular.html',
                    src: 'code/tax/angular.html',
                    type: 'code',
                    id: '3-2-2'
                },{
                    name: 'Preview',
                    src: 'code/tax/angular.html',
                    type: 'iframe',
                    id: '3-2-3'
                }]
            },{
                name: 'jQuery',
                id: '3-3',
                tabs: [{
                    name: 'jquery.js',
                    src: 'code/tax/jquery.js',
                    type: 'code',
                    id: '3-3-1'
                },{
                    name: 'jquery.html',
                    src: 'code/tax/jquery.html',
                    type: 'code',
                    id: '3-3-2'
                },{
                    name: 'Preview',
                    src: 'code/tax/jquery.html',
                    type: 'iframe',
                    id: '3-3-3'
                }]
            }]
        },{
            name: 'US Budget D3',
            id: '4',
            tabs:[{
                name: 'colors.js',
                src: 'code/usBudget/scripts/colors.js',
                type: 'code',
                id: '4-1'
            },{
                name: 'd3.js',
                src: 'code/usBudget/scripts/d3.js',
                type: 'code',
                id: '4-2'
            },{
                name: 'GovDataController.js',
                src: 'code/usBudget/scripts/GovDataController.js',
                type: 'code',
                id: '4-3'
            },{
                name: 'index.html',
                src: 'code/usBudget/index.html',
                type: 'code',
                id: '4-4'
            },{
                name: 'Preview',
                src: 'code/usBudget/index.html',
                type: 'iframe',
                id: '4-5'
            }]
        },{
            name: 'View this site on GitHub',
            href: 'https://github.com/powellkerry/Portfolio',
            id: '5'
        }]

        $scope.updateActiveTab = function(tab) {
            if (!tab) {
                $('[data-target="#'+this.activeTab+'"]').trigger('click');

                if (this.activeSubTab) {
                    $('[data-target="#'+this.activeSubTab+'"]').trigger('click');
                    var item = $filter('filter')($scope.data, {id: this.activeTab.substr(0,1)})[0];
                    var tab = $filter('filter')(item.tabs, {id:this.activeTab})[0];
                    var subTab = $filter('filter')(tab.tabs, {id: this.activeSubTab})[0];
                    $scope.loadCode(subTab);
                }
            } else {
                if (tab.id.length == 3) {
                    $scope.activeTab = tab.id;
                } else {
                    $scope.activeSubTab = tab.id;
                }
            }
        }

        $scope.loadCode = function(tab) {
            CodeFactory.loadCode(tab.src, function(result) {
                tab.code = result;
            });
        }
    }]);