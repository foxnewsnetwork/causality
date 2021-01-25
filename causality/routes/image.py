import os
from flask import Flask, request, send_from_directory
from flask_uploads import IMAGES, UploadSet, configure_uploads
from typing import Callable
from causality.orm.image import Image
from causality.db import db


def image_route(setup_route: Callable[[], Flask]) -> Callable[[], Flask]:
    app = setup_route()

    app.config["UPLOADED_PHOTOS_DEST"] = "data/img"
    app.config["SECRET_KEY"] = os.urandom(24)

    uploaded_photos = UploadSet('photos', IMAGES)
    configure_uploads(app, uploaded_photos)

    @app.route('/image', methods=['POST'])
    def upload_image():
        if 'image' in request.files:
            photo = request.files['image']
            filename = uploaded_photos.save(photo)
            record = Image(path=filename)
            db.session.add(record)
            db.session.commit()
            return f"{record.id}::{filename}"
        return "failed to upload"

    @app.route('/image/<path:filename>', methods=['GET'])
    def get_image(filename):
        work_dir = os.path.join(
            os.getcwd(), app.config['UPLOADED_PHOTOS_DEST'])
        return send_from_directory(work_dir, filename)

    return setup_route
