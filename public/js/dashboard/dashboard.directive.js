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

    function DashboardDirective($document) {

        return {
            restrict: 'E',
            scope: {},
            template: '<div class="dashing container_12" ng-transclude></div>',
            replace: true,
            transclude: true,
            controller: [function () {
                console.log('dashboard controller');
            }],
            link: function (scope, element, attrs) {
                console.log('linking dashboard');

                var x, y;
                var styles = '';

                for (x = 0; x < 12; x++) {
                    styles += '.col' + (x + 1) + ' { left: ' + (64 * x) + 'px; }\n';
                }

                for (y = 0; y < 8; y++) {
                    styles += '.row' + (y + 1) + ' { top: ' + (64 * y) + 'px; }\n';
                }

                styles += '.colspan1 { width: 250px }\n';
                styles += '.colspan1_5 { width: 378px }\n';
                styles += '.colspan2 { width: 506px }\n';
                styles += '.colspan3 { width: 762px }\n';

                for (y = 1; y <= 8; y++) {
                    styles += '.rowspan' + (y) + ' { height: ' + (58 * y + 6 * (y - 1)) + 'px; }\n';
                }

                var style = angular.element('<style type="text/css"></style>');
                style.text(styles);
                var head = $document.find('head');
                head.append(style);

                var content = angular.element('<div class="content"></div>');
                element.append(content);

                for (y = 1; y <= 8; y++) {
                    for (x = 1; x <= 12; x++) {
                        content.append(angular.element('<div class="widget base col' + x + ' row' + y + '"></div>'));
                    }
                }

                content.append(angular.element('<div class="widget col3 row4 colspan1 rowspan4"></div>'));

                element.addClass('done');
            }
        };
    }

    dashing.DashboardDirective = [
        '$document',
        DashboardDirective
    ];

}(angular, dashing || (dashing = {})));
