
function DashboardController($scope) {
    $scope.test = 'This is only a test';
}

DashboardController.prototype.injection = function () {
    return [
        '$scope',
        DashboardController
    ];
}