import graphene


class TrainingSet(graphene.ObjectType):
    name = graphene.String(required=True)
    id = graphene.ID(required=True)
