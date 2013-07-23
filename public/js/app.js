angular.module('dashing', [])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/assets/templates/dashboard.tmpl',
                controller: 'DashboardController'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    }])

    .controller('DashboardController', DashboardController.prototype.injection())
    ;
