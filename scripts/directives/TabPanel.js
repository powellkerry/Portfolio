angular.module('Portfolio')
    .directive('tabPanel', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                tabs: '=tabs',
                tabClickFn: '&tabClickFn'
            },
            link: function(scope, element, attrs) {
                scope.side=attrs.hasOwnProperty('side');
                scope.activateTab = function($event, ref) {
                    scope.tabClickFn({$event: $event});
                    if (!$event.target.classList.contains('active')) {
                        angular.forEach($event.target.parentElement.parentElement.querySelectorAll('.active'), function(el) {
                            el.classList.remove('active');
                        });
                        $event.target.classList.add('active');
                        document.querySelector('[data-id='+ref+']').classList.add('active');

                    }
                }
            },
            templateUrl: 'tpl/tab-panel.html'
        }
    });