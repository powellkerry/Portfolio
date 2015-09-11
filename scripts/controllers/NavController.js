angular.module('Portfolio')
    .controller('NavController', function($scope) {
        $scope.showHideMenu = function($event) {
            if (!$event.target.classList.contains('menu')) {
                return;
            }
            var target = $event.target,
                collapsed = target.getElementsByTagName('ul')[0].classList.contains('collapsed');

            if (collapsed) {
                target.getElementsByTagName('ul')[0].classList.remove('collapsed');
                target.getElementsByTagName('ul')[0].classList.add('expanded');
            } else {
                target.getElementsByTagName('ul')[0].classList.remove('expanded');
                target.getElementsByTagName('ul')[0].classList.add('collapsed');
            }
        }
        document.onclick = function(event) {
            var nav = document.getElementsByClassName('site-nav')[0].getElementsByClassName('menu')[0],
                isChildOfNav = false,
                currentEl = event.target;

            while (currentEl) {
                if (currentEl.classList.contains('menu')) {
                    isChildOfNav = true;
                    currentEl = null;
                } else {
                    currentEl = currentEl.parentElement;
                }
            }
            if (nav.children[0].classList.contains('expanded') && !isChildOfNav) {
                nav.click();
            }

            if (!event.target.classList.contains('menu') && isChildOfNav) {
                setTimeout(function() {
                    nav.click();
                }, 100);
            }

        }
    });