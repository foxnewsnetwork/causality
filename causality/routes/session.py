import os
from flask import Flask, jsonify, session
from typing import Callable
from flask_session import Session


def session_route(setup_route: Callable[[], Flask]) -> Callable[[], Flask]:
    app = setup_route()
    app.secret_key = os.urandom(24)
    app.config['SESSION_TYPE'] = 'filesystem'
    Session(app)

    @app.route('/session', methods=['GET'])
    def show_session():
        output = {}
        for key in ['username', 'training_set']:
            if session.get(key):
                output[key] = session.get(key)
        return jsonify(output)
    return setup_route
