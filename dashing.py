#!/usr/bin/python
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

from flask import Flask, url_for, render_template, json

from dashing.settings.config import Config
from dashing.settings.settings import Settings
from dashing.plugin.pluginloader import PluginLoader

config = Config()

app = Flask(__name__, static_url_path='/assets', static_folder='public')

settings = Settings(config.getConfig('db'))
plugins = PluginLoader('plugins')

# API endpoints

@app.route('/api/plugins')
def plugins():
    return "TBC";

@app.route('/api/settings')
def settings():
    return "TBC"

# Catch all endpoint serving the index page

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')
    # return render_template(url_for("static", filename="index.html"))
#     return static_file('index.html', root='public')

if __name__ == "__main__":
    app.run(debug=True)
