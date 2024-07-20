from flask import Blueprint,requests,jsonify
from sklearn.metrics.pairwise import haversine_distances
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from math import radians
from sklearn.neighbors import BallTree

model_bp = Blueprint('model', __name__)

#trains a model from our data 
@model_bp.route('/trainModel')
def train_model():
    datas = pd.read_csv("geoCodedBenjiData.csv")
    datas = datas.dropna(subset=['Latitude', 'Longitude'])
    dataFrame = pd.DataFrame(datas)
    #convert that shii to rads fir use in a ball tree before KNN
    dataFrame['latRads'] = dataFrame['Latitude'].apply(lambda x: radians(x))
    dataFrame['longRads'] = dataFrame['Longitude'].apply(lambda x: radians(x))
    coordinates = np.radians(datas[['Latitude', 'Longitude']])
    results = haversine_distances(coordinates)
    tree = BallTree(coordinates, leaf_size=2, metric='haversine')

#get the geocode for the address passed to /predict
def getGeocode(address):
    pass

#takes in address data and calculates the nearest neighbors.
#checks the data to see if they are unlicensed or not. if at least 5 percent points dont have a license
#returns the address, lat long, and decision. 
@model_bp.route('/predict', methods=['GET'])
def predict():
    address - requests.args.get("address", type = str)
    if address is None:
        return jsonify({"error":"invalid address"}),400
    
    
    return "Model Service: Predict"