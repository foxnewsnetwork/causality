from causality.orm.training_set import TrainingSet as TrainingSetDB
from .object import TrainingSet


class TrainingSetData:
    @staticmethod
    def record_to_object(record):
        return TrainingSet(id=record.id, name=record.name)

    @staticmethod
    def find_by_id(id):
        record = TrainingSetDB.query.get(id)
        return TrainingSetData.record_to_object(record)

    @staticmethod
    def list(offset=0, limit=100):
        records = TrainingSetDB.query.offset(offset).limit(limit).all()
        return [TrainingSetData.record_to_object(record) for record in records]
