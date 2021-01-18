import os
from typing import Callable
import click
from flask import Flask
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db():
    db.drop_all()
    db.create_all()


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear existing data and create new tables."""
    init_db()
    click.echo("Initialized the database.")


def connect_db(get_app: Callable[[], Flask]) -> Callable[[], Flask]:
    app = get_app()
    db_dir = os.path.join(os.getcwd(), "data")
    db_path = os.path.join(db_dir, "causality.sqlite")
    os.makedirs(db_dir, exist_ok=True)
    db_url = f"sqlite:///{db_path}"
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    app.cli.add_command(init_db_command)
    return get_app
