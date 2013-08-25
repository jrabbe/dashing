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

            return {
                restrict: 'E',
                scope: {
                    icon: '@',
                    preview: '@'
                },
                replace: true,
                transclude: true,
                template: '<div class="widget" ng-transclude></div>',
                link: function (scope, element, attrs) {

                    var settingsButton = angular.element('<div class="icon settings-button"></div>');
                    element.append(settingsButton);

                    settingsButton.bind('click', function () {
                        console.log('widget settings button clicked');
                    });

                    scope.$watch('preview', function (value) {
                        if (angular.isDefined(value)) {
                            element.addClass('preview');
                            if (angular.isString(scope.icon)) {
                                element.css({'background-image': 'url(' + attrs.icon + ')'});
                            }
                        } else {
                            element.removeClass('preview');
                            element.css({'background-image': ''});
                        }
                    });
                }
            };
        }];

}(angular, dashing || (dashing = {})));
