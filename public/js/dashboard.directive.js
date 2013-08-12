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

    dashing.DashboardDirective = [
        '$document',
        '$timeout',
        function ($document, $timeout) {

            return {
                restrict: 'E',
                scope: {},
                template: '<div class="dashing container_12" ng-transclude></div>',
                replace: true,
                transclude: true,
                controller: 'DashboardController',
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

                    styles += '.colspan1 { width: 256px }\n';
                    styles += '.colspan1_5 { width: 384px }\n';
                    styles += '.colspan2 { width: 512px }\n';
                    styles += '.colspan3 { width: 768px }\n';

                    for (y = 1; y <= 8; y++) {
                        styles += '.rowspan' + (y) + ' { height: ' + (64 * y) + 'px; }\n';
                    }

                    var style = angular.element('<style type="text/css"></style>');
                    style.text(styles);
                    var head = $document.find('head');
                    head.append(style);

                    for (y = 1; y <= 8; y++) {
                        for (x = 1; x <= 12; x++) {
                            element.append(angular.element('<div class="widget base col' + x + ' row' + y + '"></div>'));
                        }
                    }

                    // TODO remove, it was just to test
                    element.append(angular.element('<div class="widget col3 row4 colspan1 rowspan4"><div class="settings-button icon"></div></div>'));

                    $timeout(function () {
                        element.addClass('done');
                    }, 100);
                }
            };
        }];

}(angular, dashing || (dashing = {})));