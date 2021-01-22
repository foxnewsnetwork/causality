from causality.db import db


class NeuralNet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String)
    specs = db.Column(db.String)
