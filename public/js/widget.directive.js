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

    dashing.WidgetDirective = [
        function () {

            var _colspan = function (value) {
                switch (+value) {
                    case 1:
                        return 'colspan1';
                    case 1.5:
                        return 'colspan1_5';
                    case 2:
                        return 'colspan2';
                    case 3:
                        return 'colspan3';
                    default:
                        console.error('unknown column span: ', value);
                        return 'colspan1';
                }
            }

            var _rowspan = function (value) {
                return 'rowspan' + value;
            }

            return {
                replace: true,
                restrict: 'E',
                scope: {
                    preview: '@',
                    icon: '@',
                    width: '@',
                    height: '@'
                },
                template: '<div class="widget" ng-transclude></div>',
                transclude: true,

                link: function (scope, element) {

                    var settingsButton = angular.element('<div class="icon settings-button"></div>');
                    element.append(settingsButton);

                    settingsButton.bind('click', function () {
                        console.log('widget settings button clicked');
                    });

                    scope.$watch('preview', function (value) {
                        if (angular.isDefined(value)) {
                            element.addClass('preview');
                            if (angular.isString(scope.icon)) {
                                element.css({'background-image': 'url(' + scope.icon + ')'});
                            }
                        } else {
                            element.removeClass('preview');
                            element.css({'background-image': ''});

                            if (angular.isDefined(scope.width)) {
                                element.addClass(_colspan(scope.width));
                            } else {
                                element.addClass(_colspan(1));
                            }

                            if (angular.isDefined(scope.height)) {
                                element.addClass(_rowspan(scope.height));
                            } else {
                                element.addClass(_rowspan(1));
                            }
                        }
                    });
                }
            };
        }];

}(angular, dashing || (dashing = {})));
