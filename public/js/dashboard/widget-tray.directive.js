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

    function WidgetTrayDirective() {

        return {
            restrict: 'E',
            scope: {},
            require: '^dashboard',
            template: '',
            replace: true,
            link: function (scope, element, attrs, controller) {
                console.log('linking widget tray');

                var settingsButton = angular.element('<div class="settings"><div class="menu"></div></div>');
                element.parent().append(settingsButton);

                settingsButton.bind('click', function () {
                    console.log('settings button clicked');
                });
            }
        };
    }

    dashing.WidgetTrayDirective = [
        WidgetTrayDirective
    ];

}(angular, dashing || (dashing = {})));
