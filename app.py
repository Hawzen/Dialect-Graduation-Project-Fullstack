import sys
from os.path import join, dirname, exists

from flask import Flask, redirect, send_from_directory, make_response, render_template

root_dir = dirname(__file__)
react_build_route = join(root_dir, "ui", "build")
react_static_route = join(react_build_route)
sys.path.append(root_dir)
from api.main_api import main as main_blueprint # , db, Comment

app = Flask(__name__, static_folder=react_build_route) 
app.register_blueprint(main_blueprint)


# React app
@app.route("/")
@app.route("/<path:path>")
def homepage(path="index.html"):
    full_path = join(react_static_route, path)
    alt_full_path = join(react_build_route, path)

    if path and (exists(full_path) or exists(alt_full_path)):
        return app.send_static_file(path)

    return "ERROR, NOT FOUND"    

if __name__ == "__main__":
    app.run(debug=True)