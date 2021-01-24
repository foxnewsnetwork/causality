import graphene
from .neural_network import NeuralNetwork, NeuralNetworkData
from .training_set import TrainingSet, TrainingSetData
from .image import Image, ImageData


class Query(graphene.ObjectType):
    neural_networks = graphene.List(graphene.NonNull(NeuralNetwork))
    neural_network = graphene.Field(
        NeuralNetwork, id=graphene.ID(required=True))

    def resolve_neural_network(parent, info, id):
        return NeuralNetworkData.find_by_id(id)

    def resolve_neural_networks(parent, info):
        return NeuralNetworkData.list()

    training_set = graphene.Field(TrainingSet, id=graphene.ID(required=True))
    training_sets = graphene.List(graphene.NonNull(TrainingSet))

    def resolve_training_set(parent, info, id):
        return TrainingSetData.find_by_id(id)

    def resolve_training_sets(parent, info):
        return TrainingSetData.list()

    image = graphene.Field(Image, id=graphene.ID(required=True))
    images = graphene.List(Image, id=graphene.ID(required=True))

    def resolve_image(parent, info, id):
        return ImageData.find_by_id(id)

    def resolve_images(parent, info, id):
        return ImageData.list(training_set_id=id)
