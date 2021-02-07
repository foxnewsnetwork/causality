import graphene
from causality.schema.training_set import TrainingSet


class Session(graphene.ObjectType):
    username = graphene.String()
    training_set = graphene.Field(TrainingSet)
