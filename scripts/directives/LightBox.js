angular.module('Portfolio')
    .directive('lightBox', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                var count = 1,
                    files = [];
                while (count < parseInt(attrs.count)) {
                    files.push(attrs.directory+'/'+count+'.png');
                    count++;
                }
                scope.title=attrs.title;
                scope.selectedFile = files[0];
                scope.imageFiles = files;

                scope.open = function($event) {
                    $event.target.nextElementSibling.classList.add('visible');
                };

                scope.close = function() {
                    document.querySelector('.modal.visible').classList.remove('visible');
                };

                scope.modalClick = function($event) {
                    if ($event.target.classList.contains('modal')) {
                        scope.close();
                    }
                };

                scope.move = function(direction) {
                    if (direction == 'back') {
                        var index = scope.imageFiles.indexOf(scope.selectedFile) - 1;
                        if (index < 0) {
                            index = scope.imageFiles.length - 1;
                        }
                        scope.selectedFile = scope.imageFiles[index]
                    } else {
                        var index = scope.imageFiles.indexOf(scope.selectedFile) + 1;
                        if (index > scope.imageFiles.length - 1) {
                            index = 0;
                        }
                        scope.selectedFile = scope.imageFiles[index]
                    }
                };
            },
            templateUrl: 'tpl/light-box.html'
        }
    })