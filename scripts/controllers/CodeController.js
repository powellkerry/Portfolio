app.controller('CodeController', function($scope, CodeFactory) {
    $scope.code;

    $scope.loadCode = function($event) {
        var url = $event.target.attributes.getNamedItem('data-source').value;
        CodeFactory.loadCode(url, function(result) {
            $scope.code = result;
        });
    }



});