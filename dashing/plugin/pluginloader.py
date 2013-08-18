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

import os
from .plugin import Plugin

class PluginLoader:
    """A class that can load plugins at a specified location."""

    def __init__(self, location):
        self.pluginDir = os.path.realpath(location)
        self.plugins = dict()

        for pluginDirName in os.listdir(self.pluginDir):
            pluginPath = os.path.join(self.pluginDir, pluginDirName)
            if os.path.isdir(pluginPath) and not pluginDirName in self.plugins:
                self.plugins[pluginDirName] = Plugin(pluginDirName, pluginPath)

    def getPlugins(self):
        return self.plugins.keys()

    def getPlugin(self, plugin):
        if plugin in self.plugins:
            return self.plugins[plugin].getSettings()

        return None

    def getIcon(self, plugin):
        if plugin in self.plugins:
            return self.plugins[plugin].getIcon()

        return None
