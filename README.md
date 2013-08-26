dashing
=======

A web app that provides an easy and nice way to add widgets and data sources. A number of widgets
are included to help get started, and new plugins can be created as described in the *Plugin
Development* section below. New plugins can be installed simply by dropping them into the `plugins`
folder.

Dependencies
------------

This web application simply depends on the *flask* python module. I would suggest creating a virtual
environment for installing into. Make sure you have `virtualenv` installed, and run.

    virtualenv dashing-env
    . dashing-env/bin/activate

After activating the environment simply run pip like normal.

    pip install flask

Now you can run the app using

    python dashing.py

Each time you want to run the app, you just activate the virtual environment, and start the
dashing.py script again.

Configuration
-------------

Configuration for the app is done through a `config.json` file in the root (next to `dashing.py`).
This file is read at application startup and can be used to specify location of custom assets,
where to load plugins, db name and password (if necessary), etc.

Implementation Details
----------------------

This web app is created using AngularJS, and is served with a Python app using Flask. The python
is responsible for the rest API endpoints, and for serving the plugin data.

The main functionality of the dashboard reside in AngularJS directives. The dashboard itself is
simply an empty `<dashboard>` element. This element is populated with the widgets and functionality
of the dashboard.

Without going into too much detail, the tray containing available widgets to add is the *Widget
Tray*, and then we have the individual *Widget* elements. Together these elements form the basis
of the dashboard, and allow the examples that will be shown shortly (as functionality is added).

Plugin Development
------------------

A plugin is a collection of browser, server, and template files. Browser files are simply
JavaScript, server files are Python, and template files are HTML. The files that make up the
plugin are described in a JSON file which has the same filename as the plugin directory. For
instance the plugin `graph` has a file `graph.json` which describes its structure.

The valid fields in the JSON file are:

* **name** : The display name of the plugin

* **description** : A short description of the plugin. Shown as a tooltip for the widget in
  its preview state (in the widget tray).

* **icon** *(optional)* : The relative path to the image file with the icon for this plugin.
  If the *icon* attribute is left out, a default "plugin" icon is used. Size of an icon should
  be 128 x 128 pixels.

* **files** *(optional)* : An object that contains arrays of paths to the *browser*, *server*, and
  *template* files. If not provided, it is expected that the plugin has the files `<plugin>.js`,
  `<plugin>.py`, and `<plugin>.tmpl` for *browser*, *server*, and *template* respectively.

  A plugin does not need to have a *server* file, but can be completely client side. The *browser*
  and *template* files are, however, needed to show anything on the dashboard.

Below is shown the JSON file for the `graph` plugin as an example. The files provided are
superfluous in this case, but provided for clarity.

    {
        "name": "Graph",
        "description": "A plugin for graphing data from different sources.",
        "icon": "graph.png",
        "files": {
            "server": ["graph.py"],
            "browser": ["graph.js"],
            "template": ["graph.tmpl"]
        }
    }
