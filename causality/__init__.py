from typing import Dict
from flask import Flask, request
import os
from causality.schema import schema


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/api', methods=['POST'])
    def hello_world():
        data = request.get_json()
        result = schema.execute(
            data["query"]
        )
        return result.data

    @app.route('/image', methods=['POST'])
    def upload_image():
        file = request.files['file']
        data_dir = os.path.join(os.getcwd(), 'data')
        list = os.listdir(data_dir)
        number_files = len(list)
        filename = os.path.join(data_dir, f'{number_files}.png')
        file.save(filename)
        return filename
    return app
