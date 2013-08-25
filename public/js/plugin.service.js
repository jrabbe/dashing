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

            var _attributeString = function (attributes) {
                var result = [];
                angular.forEach(attributes, function (value, key) {
                    result.push(key + '="' + value + '"');
                });

                return result.join(' ');
            }

            var _createElement = function (name, attributes, scope) {
                var result = '<' + name + ' ' + _attributeString(attributes) + '></' + name + '>';
                return $compile(result)(scope);
            };


            this.getPluginList = function (success) {
                if (!angular.isDefined(_plugins)) {
                    $http.get('/api/plugins').then(function (response) {
                        if (angular.isDefined(response.data) && !angular.isDefined(response.data.error)) {
                            _plugins = {}
                            angular.forEach(response.data, function (value) {
                                _plugins[value] = undefined;
                            });
                            (success || angular.noop)(Object.keys(_plugins));
                        }
                    });
                } else {
                    (success || angular.noop)(Object.keys(_plugins));
                }
            };

            this.createPlugin = function (plugin, preview, scope, success) {
                var createPlugin = function (hasPreview, sizes) {
                    var attributes = {};
                    if (hasPreview) {
                        attributes.preview = '';
                        attributes.icon = '/api/plugins?name=' + plugin + '&icon';
                    } else {
                        // something else;
                        if (angular.isArray(sizes) && sizes.length > 0) {
                            attributes.width = sizes[0].width;
                            attributes.height = sizes[0].height;
                        }
                    }

                    var widget = _createElement('widget', attributes, scope);

                    (success || angular.noop)(widget);
                }

                if (angular.isDefined(_plugins) && _plugins.hasOwnProperty(plugin)) {
                    if (angular.isDefined(_plugins[plugin])) {
                        createPlugin(preview, _plugins[plugin].sizes);
                    } else {
                        $http.get('/api/plugins', {params: {name: plugin}}).then(function (response) {
                            _plugins[plugin] = response.data;
                            createPlugin(preview, _plugins[plugin].sizes);
                        });
                    }
                } else {
                    console.error('Trying to create plugin ' + plugin + ' which does not exist.');
                }
            };
        }
    ];

}(angular, dashing || (dashing = {})));
