
from google.cloud import storage
import requests
import os
import shutil
import joblib

from flask import json, Response
import sklearn
import pandas as pd
import numpy as np

storage_client = storage.Client()
bucket = storage_client.get_bucket("naive_bayes_bucket")
blob = bucket.blob("naive_bayes.model")
blob.download_to_filename("/tmp/naive_bayes.model")  
naive_bayes = joblib.load("/tmp/naive_bayes.model")

def predict_dialect(request):

  if request.method == 'GET':
    res = Response(response="ok")
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return res
  elif request.method == 'POST':
    data = request.get_json(force=True)
    dialect_text = data["text"]
    dialect_text_list = [dialect_text]

    prediction = naive_bayes.predict_proba(dialect_text_list)[0]
    prediction = json.dumps(prediction.tolist())
    #label_id = np.argmax(prediction[0])
    #dialect_class = id2label[label_id]
      
    res = Response(response=prediction)
    # Allows GET requests from any origin with the Content-Type
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'POST'
    res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return res
  elif request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    # header and caches preflight response for an 3600s
    res = Response(response="ok")
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return res
  else:
    res = Response(response="ok")
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return res
