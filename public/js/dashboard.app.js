// -------------------------------------------------------------------------------------------------
// Copyright 2013 Jonas Rabbe
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// -------------------------------------------------------------------------------------------------

var dashing;
(function (angular, dashing) {
    'use strict';

    angular.module('dashing', [])

        .constant('DASHBOARD_SIZE', {width: 12, height: 8})

        .controller('DashboardController', dashing.DashboardController)

        .directive('dashboard', dashing.DashboardDirective)
        .directive('widgetTray', dashing.WidgetTrayDirective)
        .directive('widget', dashing.WidgetDirective)

        .service('Plugin', dashing.PluginService)

        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/assets/templates/dashboard.tmpl',
                    controller: 'DashboardController'
                })
                .otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
        }])
        ;

}(angular, dashing || (dashing = {})));