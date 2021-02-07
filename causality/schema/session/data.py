import graphene
from .object import Session
from flask import session
from causality.schema.training_set import TrainingSetData


def noop(x): return x


class SessionData:
    @staticmethod
    def current():
        rehydratedData = {}
        for key in SessionData.allowed_keys:
            if session.get(key):
                rehydrate = SessionData.deserializer_dict.get(key, noop)
                rehydratedData[key] = rehydrate(session.get(key))
        return Session(**rehydratedData)

    @staticmethod
    def set(key, value):
        if key in SessionData.allowed_keys:
            session[key] = value
        return SessionData.current()


SessionData.allowed_keys = {'training_set', 'username'}
SessionData.deserializer_dict = {
    'training_set': TrainingSetData.find_by_id
}
