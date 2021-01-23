from causality.db import db
from .training_set import TrainingSet


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String, unique=True, nullable=False)
    label = db.Column(db.String)

    training_set_id = db.Column(db.Integer, db.ForeignKey(
        'training_set.id'))
    training_set = db.relationship(
        TrainingSet, backref=db.backref('images', lazy=True))
