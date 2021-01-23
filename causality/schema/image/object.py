import graphene
from causality.schema.training_set import TrainingSet


class Image(graphene.ObjectType):
    id = graphene.ID(required=True)
    path = graphene.String(required=True)
    label = graphene.String()

    training_set = graphene.Field(TrainingSet)
