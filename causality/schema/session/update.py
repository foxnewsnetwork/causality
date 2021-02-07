from causality.schema import training_set
import graphene
from .object import Session
from .data import SessionData


class UpdateSession(graphene.Mutation):
    class Arguments:
        training_set = graphene.ID()
        username = graphene.String()

    Output = Session

    def mutate(root, info, **data):
        for key in data:
            if not data[key] is None:
                SessionData.set(key, data[key])
        return SessionData.current()
