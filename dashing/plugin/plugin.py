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

from flask import json
import os

from .. import errors

class Plugin:
    """A class that represents a plugin."""

    def __init__(self, name, path):
        self.name = name
        with open(os.path.realpath(os.path.join(path, name + '.json'))) as j:
            self.settings = json.load(j)

        if 'icon' in self.settings:
            iconPath = os.path.join(path, self.settings['icon'])
            if not os.path.isfile(iconPath):
                raise errors.FileNotFoundError(self.settings['icon'], path)
            else:
                self.icon = iconPath

        for key in self.settings['files']:
            for fileName in self.settings['files'][key]:
                if not os.path.isfile(os.path.join(path, fileName)):
                    raise errors.FileNotFoundError(fileName, path)

        # At this point the settings have been read, and we are satisfied that the plugin
        # is somewhat usable.

    def getSettings(self):
        return self.settings

    def getIcon(self):
        with open(self.icon, 'r') as f:
            return f.read()

