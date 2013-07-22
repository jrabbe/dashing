#!/usr/bin/python

#
# The main application file for dashing.
#

from flask import Flask, url_for, render_template

app = Flask(__name__, static_url_path='/assets', static_folder='public')

# API endpoints

@app.route('/hello')
def hello():
    app.logger.debug('testing')
    return "Hello World!"

# Catch all endpoint serving the index page

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return app.send_static_file('index.html')
    # return render_template(url_for("static", filename="index.html"))
#     return static_file('index.html', root='public')

if __name__ == "__main__":
    app.run(debug=True)
