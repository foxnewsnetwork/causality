import graphene


class InputTrainingSet(graphene.InputObjectType):
    name = graphene.String(required=True)
