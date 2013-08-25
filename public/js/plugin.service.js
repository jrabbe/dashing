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
     * Service for plugin handling. Responsible for fetching data from the server, and use by the
     * dashboard directive to keep track of how the widgets are laid out (optional, create a new
     * widget service to do this).
     */

    dashing.PluginService = [
        '$compile',
        '$http',
        function ($compile, $http) {

            var _plugins = undefined;
            var _colspan = function (value) {
                switch(value) {
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

            this.getPlugins = function (success) {
                // use $http to request /api/plugins
                $http.get('/api/plugins').then(function (response) {
                    console.log(response);
                    if (angular.isDefined(response.data) && !angular.isDefined(response.data.error)) {
                        _plugins = response.data;
                        (success || angular.noop)(_plugins);
                    }
                });
            };

            this.createPlugin = function (plugin, preview, scope, success) {
                var previewAttr = preview && 'preview ' || '';
                var widget = $compile('<widget ' + previewAttr + 'icon="/api/plugins?name=' +
                    plugin + '&icon"></widget>')(scope);

                (success || angular.noop)(widget);
            };
        }
    ];

}(angular, dashing || (dashing = {})));