from flask import Blueprint, request, jsonify
from sklearn.metrics.pairwise import haversine_distances
import numpy as np
import pandas as pd
from math import radians
from sklearn.neighbors import BallTree
import os
import requests
import plotly.express as px

report_bp = Blueprint('report', __name__)


@report_bp.route('/getTheVis', methods=['GET'])
def getTheVis():
    baseNN = os.path.join(os.path.dirname(__file__),"nearest_neighbors.csv")
    basePP = os.path.join(os.path.dirname(__file__),"predicted_point.csv")
    nearestNeighbors = pd.read_csv(baseNN)
    pp = pd.read_csv(basePP)
    fig = px.scatter_mapbox()
        
        # Add nearest neighbors data
    fig.add_scattermapbox(
            lat=nearestNeighbors['Latitude'],
            lon=nearestNeighbors['Longitude'],
            mode='markers',
            marker=dict(size=10, color='blue'),
            name='Nearest Neighbors'
        )
        
    
        # Update layout
    fig.update_layout(
            mapbox_style="open-street-map",
            margin={"r":0, "t":0, "l":0, "b":0},
            legend=dict(yanchor="top", y=0.99, xanchor="left", x=0.01)
        )
        
        # Convert figure to JSON-serializable format
    figure_json = fig.to_json()
    
    
    if not pp.empty and not nearestNeighbors.empty:
        return jsonify({"message": "CSV files loaded successfully"}), 200
    else:
        return jsonify({"error": "CSV files are empty or invalid"}), 500
    