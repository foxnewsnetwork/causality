from flask import Flask, request, abort, jsonify
from causality.schema import schema
from typing import Callable


def api_route(setup_route: Callable[[], Flask]) -> Callable[[], Flask]:
    app = setup_route()

    @app.route('/api', methods=['POST'])
    def execute_graphql():
        data = request.get_json()
        result = schema.execute(
            data["query"],
            **data
        )
        if result.errors:
            return jsonify(dict(data=result.data, errors=result.errors))
        return jsonify(dict(data=result.data))

    return setup_route
