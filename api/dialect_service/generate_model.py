#!/usr/bin/env python
# coding: utf-8

# In[1]:


from glob import glob
import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import precision_recall_fscore_support


# In[2]:


files = glob("Alshutairi/*.txt")
dataframes = []

for file in files:
    region = file[-7:-4]
    temp_df = pd.read_csv(file, encoding="utf8", delimiter="\n", names=["Text"])
    temp_df["Region"] = region
    dataframes.append(temp_df)
    
df = pd.concat(dataframes)


# In[3]:


X_train, X_test, y_train, y_test = train_test_split(df["Text"], df["Region"], random_state=0)
count_vectorizer = CountVectorizer().fit(X_train)
X_train_vectorized = count_vectorizer.transform(X_train)
X_test_vectorized = count_vectorizer.transform(X_test)


# In[4]:


naive_bayes = MultinomialNB(alpha=0.1)
naive_bayes.fit(X_train_vectorized, y_train)
naive_bayes.score(X_test_vectorized, y_test)


# In[6]:


precision, recall, fscore, support = precision_recall_fscore_support(naive_bayes.predict(X_test_vectorized), y_test)


# In[17]:


for i, region in enumerate(df["Region"].unique()):
    print(f"{region}\nPrecision: {round(precision[i], 4)}, Recall: {round(recall[i], 4)}, FScore: {round(fscore[i], 4)}, Support: {support[i]}")


# In[39]:


joblib.dump(naive_bayes, "naive_bayes.model")

