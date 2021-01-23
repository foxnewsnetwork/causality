import graphene
from .neural_network import CreateNeuralNetwork
from .training_set import CreateTrainingSet
from .image import AttachImageToTrainingSet, LabelImage


class Mutation(graphene.ObjectType):
    create_neural_network = CreateNeuralNetwork.Field()
    create_training_set = CreateTrainingSet.Field()
    attach_image_to_training_set = AttachImageToTrainingSet.Field()
    label_image = LabelImage.Field()
