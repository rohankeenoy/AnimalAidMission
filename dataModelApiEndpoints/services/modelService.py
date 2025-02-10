from flask import Blueprint, request, jsonify
from sklearn.metrics.pairwise import haversine_distances
import numpy as np
import pandas as pd
from math import radians
from sklearn.neighbors import BallTree
import os
import requests

model_bp = Blueprint('model', __name__)

# Trains a model from our data 
def train_model():
    datas = pd.read_csv(os.path.join(os.path.dirname(__file__), 'geoCodedBenjiData.csv'))
    datas = datas.dropna(subset=['Latitude', 'Longitude'])
    dataFrame = pd.DataFrame(datas)
    # Convert latitude and longitude to radians for use in a Ball Tree before KNN
    dataFrame['latRads'] = dataFrame['Latitude'].apply(lambda x: radians(x))
    dataFrame['longRads'] = dataFrame['Longitude'].apply(lambda x: radians(x))
    coordinates = np.radians(datas[['Latitude', 'Longitude']])
    tree = BallTree(coordinates, leaf_size=2, metric='haversine')
    return tree

# Gets the geocode for the address passed to /predict
def getGeocode(address):
    add = str(address)
    if address:
        url = f'https://us1.locationiq.com/v1/search.php?key=pk.224e8d22dee0cfe54b9cf3070392d434&q={add}&format=json'
        try:
            resp = requests.get(url)
            resp.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
            datas = resp.json()
            if datas:
                return {
                    "latitude": float(datas[0]["lat"]),
                    "longitude": float(datas[0]["lon"])
                }
            else:
                return None
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            return None 
    else:
        return None

# Takes in address data and calculates the nearest neighbors.
# Returns the info of NN from the dataframe and the lat longs of the predicted point.
@model_bp.route('/predict', methods=['GET'])
def predict():
    global neighbors
    print("in route")
    data = pd.read_csv(os.path.join(os.path.dirname(__file__), 'geoCodedBenjiData.csv'))
    df = pd.DataFrame(data)
    address = request.args.get("address", type=str)
    print(f"Adress is {address}")
    if not address:
        return jsonify({"error": "invalid address"}), 400
    
    ballTree = train_model()
    latAndLong = getGeocode(address)
    if latAndLong is None:
        return jsonify({"error": "geocode not found"}), 404
    
    coordinates = np.radians(np.array([[latAndLong['latitude'], latAndLong['longitude']]]))
    index, dist = ballTree.query(coordinates, k=10)
    
 # Get information about nearest neighbors from the dataframe
    nearest_neighbors_info = []
    for i in range(len(index[0])):
        row_index = index[0][i]  
        distance = dist[0][i]
        print(row_index)
        
        print("distance", distance)
        # Convert row_index to integer, if it's not already
        row_index = int(row_index)
        
        neighbor_info = df.iloc[distance].to_dict()
        neighbor_info["distance"] = float(row_index)
        nearest_neighbors_info.append(neighbor_info)
    
    response = {
        "predicted_point": {
            "latitude": float(latAndLong['latitude']),
            "longitude": float(latAndLong['longitude'])
        },
        "nearest_neighbors": nearest_neighbors_info
    }
    predicted_point_df = pd.DataFrame([response['predicted_point']])
    predicted_point_filename = 'predicted_point.csv'
    predicted_point_path = os.path.join(os.path.dirname(__file__), predicted_point_filename)
    predicted_point_df.to_csv(predicted_point_path, index=False)
    
    
    nearest_neighbors_df = pd.DataFrame(response['nearest_neighbors'])
    nearest_neighbors_filename = 'nearest_neighbors.csv'
    nearest_neighbors_path = os.path.join(os.path.dirname(__file__), nearest_neighbors_filename)
    nearest_neighbors_df.to_csv(nearest_neighbors_path, index=False)
    
    return jsonify(response)


