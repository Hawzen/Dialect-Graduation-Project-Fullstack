import os
import shutil

from flask import escape , json, Response
import numpy as np
import pandas as pd
import requests
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import DataLoader
import transformers
from transformers import AutoModel, AutoConfig, AutoModelForSequenceClassification, AutoTokenizer, BertTokenizer, EarlyStoppingCallback, BatchEncoding
from transformers import Trainer, TrainingArguments
from transformers.data.processors.utils import InputFeatures
from google.cloud import storage

from preprocess import ArabertPreprocessor

# Download BERT model
storage_client = storage.Client()
bucket = storage_client.get_bucket("dialect-model-bucket")
blobs = bucket.list_blobs(prefix="BERT 0.87/") 
for blob in blobs:
  filename = blob.name.split('/')[-1] 
  blob.download_to_filename("/tmp/"+filename)  

# Dataset class
class Dialect_dataset(torch.utils.data.Dataset):
    def __init__(self, X, Y):
        super(Dialect_dataset).__init__()
        self.X = X
        self.Y = Y
        
    def __getitem__(self, key):
        return InputFeatures(self.X["input_ids"][key], self.X["attention_mask"][key], label=self.Y[key])
        
    def __len__(self):
        return len(self.X["input_ids"])

def tokenize(batch):
    """
    Tokenizes a list of strings
    """
    model_name = "aubmindlab/bert-base-arabertv2"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    sequence_length = 32

    return tokenizer.batch_encode_plus(
        batch,
        add_special_tokens=True,
        padding="max_length",
        max_length=sequence_length,
        truncation=True,
        return_tensors="pt",
        return_attention_mask=True,
        return_token_type_ids=False,
    )

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
    #model_name = "aubmindlab/bert-base-arabertv2"
    #arabert_prep = ArabertPreprocessor(model_name)
    id2label = {0 : "EGY", 1 : "GLF", 2 : "IRQ", 3 : "LEV", 4 : "NOR"}
    training_args = TrainingArguments("/tmp/dump")
    training_args.save_strategy = "no"

    #df = pd.DataFrame({"Text" : [dialect_text]})
    #df["Text"] = df["Text"].apply(arabert_prep.preprocess)
    df_encoding = tokenize([dialect_text])
    
    prediction_input = Dialect_dataset(df_encoding, "Temp_Label")

    model = AutoModelForSequenceClassification.from_pretrained("/tmp")
    trainer = Trainer(model=model,args=training_args)
    
    prediction = trainer.predict(prediction_input)[0][0]
    prediction = torch.nn.functional.softmax(torch.tensor(prediction))
    prediction = json.dumps(prediction.tolist())
    
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