from flask import Flask, Blueprint, request, jsonify
from services.dataService import data_bp
from services.generateReport import report_bp
from services.mapService import map_bp
from services.modelService import model_bp


pawPatrol = Flask(__name__)
#blueprints for backend services
pawPatrol.register_blueprint(data_bp, url_prefix='/data')
pawPatrol.register_blueprint(report_bp, url_prefix='/report')
pawPatrol.register_blueprint(map_bp, url_prefix='/map')
pawPatrol.register_blueprint(model_bp, url_prefix='/model')


if __name__ == "__main__":
    pawPatrol.run(debug=True)