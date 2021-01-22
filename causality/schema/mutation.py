import graphene
from .neural_network import CreateNeuralNetwork


class Mutation(graphene.ObjectType):
    create_neural_network = CreateNeuralNetwork.Field()
