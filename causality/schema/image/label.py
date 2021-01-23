import graphene
from .object import Image
from causality.orm.image import Image as ImageDB
from causality.db import db


class LabelImage(graphene.Mutation):
    class Arguments:
        label = graphene.String(required=True)
        id = graphene.ID(required=True)

    Output = Image

    def mutate(root, info, label, id):
        record = ImageDB.query.get(id)
        record.label = label
        db.session.commit()
        return Image(id=record.id, path=record.path, label=record.label)
