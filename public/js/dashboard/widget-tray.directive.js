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

    dashing.WidgetTrayDirective = [
        function WidgetTrayDirective() {
            return {
                restrict: 'E',
                scope: {},
                require: '^dashboard',
                replace: true,
                template: '<div class="tray"></div>',
                link: function (scope, element, attrs, controller) {
                    console.log('linking widget tray');
                    var open = false;

                    var settingsButton = angular.element('<div class="settings"></div>');
                    element.parent().append(settingsButton);

                    var overlay = angular.element('<div class="overlay"></div>');
                    element.parent().append(overlay);


                    for (var i = 0; i < 10; i++) {
                        element.append(angular.element('<div class="widget preview"></div>'));
                    }

                    settingsButton.bind('click', function () {
                        console.log('settings button clicked');
                        element.addClass('open');
                        overlay.addClass('active');
                        var closeTray = function () {
                            element.removeClass('open');
                            overlay.removeClass('active');
                            overlay.unbind('click', closeTray);
                        };

                        overlay.bind('click', closeTray);
                    });
                }
            };
        }];

}(angular, dashing || (dashing = {})));
