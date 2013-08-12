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
(function (dashing) {
    'use strict';

    dashing.DashboardController = [
        '$scope',
        'DASHBOARD_SIZE',
        function ($scope, DASHBOARD_SIZE) {

            console.log('dashboard controller');

            // Representation of the board as an array where you can find widgets.
            var _board = Array (DASHBOARD_SIZE.width * DASHBOARD_SIZE.height);
        }];

}(dashing || (dashing = {})));
