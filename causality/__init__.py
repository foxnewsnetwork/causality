from typing import Dict
from flask import Flask, request
import os
from causality.schema import schema
from flask_uploads import IMAGES, UploadSet, configure_uploads


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config["UPLOADED_PHOTOS_DEST"] = "causality/data/img"
    app.config["SECRET_KEY"] = os.urandom(24)

    uploaded_photos = UploadSet('photos', IMAGES)
    configure_uploads(app, uploaded_photos)

    @app.route('/api', methods=['POST'])
    def hello_world():
        data = request.get_json()
        result = schema.execute(
            data["query"]
        )
        return result.data

    @app.route('/image', methods=['POST'])
    def upload_image():
        if 'image' in request.files:
            photo = request.files['image']
            filename = uploaded_photos.save(photo)
            return filename
        return "failed to upload"
    return app
