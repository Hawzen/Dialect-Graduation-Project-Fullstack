import os
from flask import escape , json, Response
import numpy as np
import pandas as pd
import csv
import requests
from google.cloud import storage

storage_client = storage.Client()
bucket = storage_client.get_bucket("saved_feedback")
blob = bucket.get_blob('Feedback.csv')
blob.download_to_filename('/tmp/temp.csv')

def save_feedback(request):
  if request.method == 'POST':
    try:
      feedback = request.get_json(force=True)
      text = feedback["text"]
      probs = feedback["probs"]
      pred = feedback["predicted"]
      actual = feedback["actual"]
      row = [text,probs,pred,actual]

      with open(r'/tmp/temp.csv', 'a') as f:
          writer = csv.writer(f)
          writer.writerow(row)
          
      blob = bucket.blob("Feedback.csv")
      blob.upload_from_filename('/tmp/temp.csv')

      res = Response(response="Your Feedback Uploaded Successfully")
      # Allows GET requests from any origin with the Content-Type
      res.headers['Access-Control-Allow-Origin'] = '*'
      res.headers['Access-Control-Allow-Methods'] = 'POST'
      res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
      return res
    except:
      res = Response(response="Something Went Wrong!")
      # Allows GET requests from any origin with the Content-Type
      res.headers['Access-Control-Allow-Origin'] = '*'
      res.headers['Access-Control-Allow-Methods'] = 'POST'
      res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
      return res
  else:
    res = Response(response="ok")
    res.headers['Access-Control-Allow-Origin'] = '*'
    res.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS'
    res.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    return res