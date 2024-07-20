from flask import Blueprint, request, jsonify
from sklearn.metrics.pairwise import haversine_distances
import numpy as np
import pandas as pd
from math import radians
from sklearn.neighbors import BallTree
import os
import requests
import plotly.express as px
import matplotlib.pyplot as plt

report_bp = Blueprint('report', __name__)


@report_bp.route('/getTheVis', methods=['GET'])
def getTheVis():
    baseNN = os.path.join(os.path.dirname(__file__),"nearest_neighbors.csv")
    basePP = os.path.join(os.path.dirname(__file__),"predicted_point.csv")
    nearestNeighbors = pd.read_csv(baseNN)
    pp = pd.read_csv(basePP)
    NN = pd.DataFrame(nearestNeighbors)
    pp = pd.DataFrame(pp)
    
    print("head",NN.head())
    print("pp",pp.head())
    plt.figure(figsize=(10, 8))
        
    plt.scatter(nearestNeighbors['Longitude'], nearestNeighbors['Latitude'], color='blue', label='Nearest Neighbors')
        
    plt.scatter(pp['longitude'], pp['latitude'], color='red', label='Viewed Puppy')
        
        # Set labels and title
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.title('Geographical Points')
        
        # Add legend
    plt.legend()
    combined_df = pd.concat([NN, pp], ignore_index=True)
    fig = px.scatter_mapbox(combined_df, lat="Latitude", lon="Longitude",color_discrete_sequence=["blue", "red"], zoom=3, height=600)
    
    fig.write_image("plot_combined.png")
    if not pp.empty and not nearestNeighbors.empty:
        return jsonify({"message": "CSV files loaded successfully"}), 200
    else:
        return jsonify({"error": "CSV files are empty or invalid"}), 500
    