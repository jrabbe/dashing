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

    /**
     * The directive for the widget tray. Loads widgets from the Plugin service and shows the
     * available widgets in the list.
     */

    dashing.WidgetTrayDirective = [
        'Plugin',
        function (Plugin) {

            return {
                restrict: 'E',
                scope: {},
                replace: true,
                template: '<div class="tray"></div>',
                link: function (scope, element, attrs) {
                    var open = false;

                    var settingsButton = angular.element('<div class="tray-button"></div>');
                    element.parent().append(settingsButton);

                    var overlay = angular.element('<div class="overlay"></div>');
                    element.parent().append(overlay);

                    Plugin.getPluginList(function (pluginList) {
                        angular.forEach(pluginList, function (plugin) {
                            Plugin.createPlugin(plugin, true, scope, function (widget) {
                                element.append(widget);
                            });
                        });
                    });

                    var openTray = function () {
                        element.addClass('is-open');
                        overlay.addClass('is-active');
                        var closeTray = function () {
                            element.removeClass('is-open');
                            overlay.removeClass('is-active');
                            overlay.unbind('click', closeTray);
                            settingsButton.bind('click', openTray);
                        };

                        overlay.bind('click', closeTray);
                        settingsButton.bind('click', closeTray);
                    };

                    settingsButton.bind('click', openTray);
                }
            };
        }];

}(angular, dashing || (dashing = {})));
