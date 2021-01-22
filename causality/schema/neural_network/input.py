import graphene


class InputNeuralNetwork(graphene.InputObjectType):
    desc = graphene.String(required=True)
