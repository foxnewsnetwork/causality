from typing import Dict
from flask import Flask, request
from causality.schema import schema
import json


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/api', methods=['POST'])
    def hello_world():
        data = request.get_json()
        result = schema.execute(
            data["query"]
        )
        return result.data

    return app
