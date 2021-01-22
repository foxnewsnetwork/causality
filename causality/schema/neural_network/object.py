import graphene


class NeuralNetwork(graphene.ObjectType):
    desc = graphene.String(required=True)
    id = graphene.ID(required=True)
