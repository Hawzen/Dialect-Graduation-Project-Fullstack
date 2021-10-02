from os.path import join, dirname
import logging
from time import strftime

import joblib
from flask import request, Blueprint

ROOT_DIR = dirname(__file__)
MODEL_ROUTE = join(ROOT_DIR, "dialect_service", "naive_bayes.model")
logging.basicConfig(filename=join(ROOT_DIR, "dialect_service", "requests.log"), filemode="a", level=logging.INFO, force=True)

main = Blueprint("Main", __name__, url_prefix="/api")
naive_bayes = joblib.load(MODEL_ROUTE)


@main.route("/text", methods=["POST"])
def serve_predict():
    text_data = request.get_json()
    
    if text_data is None:
        return "JSON was not supplied", 400
    if text_data.get("text", None) is None:
        print(text_data)
        return "JSON doesnt contain all text", 400

    timestamp = strftime('[%Y-%b-%d %H:%M]')
    logging.info(f"{timestamp} {request.remote_addr} {request.method} {request.scheme} {request.full_path} {str(text_data)}")

    pred = naive_bayes.predict_proba([text_data["text"]])[0]
    proba = {"EGY": pred[0], "GLF": pred[1], "IRQ": pred[2], 
             "LEV": pred[3], "NOR": pred[4]}

    return {"prediction": proba}, 201

