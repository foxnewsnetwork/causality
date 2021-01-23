import graphene
from .input import InputTrainingSet
from .object import TrainingSet
from causality.orm.training_set import TrainingSet as TrainingSetDB
from causality.db import db


class CreateTrainingSet(graphene.Mutation):
    class Arguments:
        data = InputTrainingSet(required=True)

    Output = TrainingSet

    def mutate(root, info, data):
        record = TrainingSetDB(name=data.name)
        db.session.add(record)
        db.session.commit()
        return TrainingSet(name=record.name, id=record.id)
