from flask import Flask, request
from causality.schema import schema
from typing import Callable


def api_route(setup_route: Callable[[], Flask]) -> Callable[[], Flask]:
    app = setup_route()

    @app.route('/api', methods=['POST'])
    def hello_world():
        data = request.get_json()
        result = schema.execute(
            data["query"]
        )
        return result.data

    return setup_route
