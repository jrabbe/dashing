# -------------------------------------------------------------------------------------------------
# Copyright 2013 Jonas Rabbe
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#  http:#www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -------------------------------------------------------------------------------------------------

#
# The main application file for dashing.
#

from flask import Flask, json, request, make_response

from dashing.settings.config import Config
from dashing.settings.settings import Settings
from dashing.plugin.pluginloader import PluginLoader

config = Config()

app = Flask(__name__, static_url_path='/assets', static_folder='public')

settings = Settings(config.getConfig('db'))
availablePlugins = PluginLoader('plugins')

# API endpoints

@app.route('/api/plugins')
def plugins():
    """Function for getting information about plugins. Invoked through the route /api/plugins.
    Invoking the route directly with a get request simply retrieves the settings for all icons
    and returns that as JSON.

    There are two available query parameters, name which is used to retrieve information about a
    specific plugin, and icon (used together with Name) to retrieve the icon for a specific icon."""
    name = request.args.get('name', None)
    icon = request.args.get('icon', False)

    print 'name = ', name
    print 'icon = ', icon

    if name is None:
        return json.dumps(availablePlugins.getPlugins())
    else:
        if icon == False:
            return json.dumps(availablePlugins.getPlugin(name))
        else:
            resp = make_response(availablePlugins.getIcon(name))
            resp.headers['Content-Type'] = 'image/png'
            return resp

@app.route('/api/settings')
def settings():
    return "TBC"

# Catch all endpoint serving the index page

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(debug=True)
