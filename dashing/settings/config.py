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
from os import path

class Config:
    """A class that loads the configuration file and makes it available."""

    def __init__(self, location=None):
        if location is None:
            location = 'config.json';

        with open (path.realpath(location), 'r') as f:
            self.config = json.load(f)

        print 'Config data: ', self.config

    def getConfig(self, key):
        if self.config is not None:
            if key in self.config:
                return self.config[key]

        return None
