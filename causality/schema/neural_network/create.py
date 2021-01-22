import graphene
from .input import InputNeuralNetwork
from .object import NeuralNetwork
from causality.orm.neural_net import NeuralNet as NeuralNetDB
from causality.db import db


class CreateNeuralNetwork(graphene.Mutation):
    class Arguments:
        data = InputNeuralNetwork(required=True)

    Output = NeuralNetwork

    def mutate(root, info, data):
        record = NeuralNetDB(desc=data.desc)
        db.session.add(record)
        db.session.commit()
        return NeuralNetwork(desc=record.desc, id=record.id)
