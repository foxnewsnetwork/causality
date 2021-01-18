from flask import Flask
from causality.routes.api import api_route
from causality.routes.image import image_route
from .db import connect_db


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @connect_db
    @api_route
    @image_route
    def setup_app():
        return app
    return app
