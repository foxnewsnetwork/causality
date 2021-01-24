from causality.orm.neural_net import NeuralNet as NeuralNetDB
from .object import NeuralNetwork


class NeuralNetworkData:
    @staticmethod
    def record_to_object(record):
        return NeuralNetwork(id=record.id, desc=record.desc, specs=record.specs)

    @staticmethod
    def find_by_id(id):
        record = NeuralNetDB.query.get(id)
        return NeuralNetworkData.record_to_object(record)

    @staticmethod
    def list(offset=0, limit=100):
        records = NeuralNetDB.query.offset(offset).limit(limit).all()
        return [NeuralNetworkData.record_to_object(record) for record in records]
