angular.module('Portfolio')
    .controller('AccordionController', function($scope) {
        $scope.showOrHide = function($event) {
            if ($event.target.classList.contains('expandable')) {
                if ($event.target.classList.contains('expanded')) {
                    $event.target.classList.remove('expanded');
                } else {
                    $event.target.classList.add('expanded');
                }
            }
        }
    });