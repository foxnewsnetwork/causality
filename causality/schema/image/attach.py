import graphene
from .object import Image
from causality.orm.image import Image as ImageDB
from causality.orm.training_set import TrainingSet as TrainingSetDB
from causality.db import db
from causality.schema.training_set import TrainingSet


class AttachImageToTrainingSet(graphene.Mutation):
    class Arguments:
        training_set_id = graphene.ID(required=True)
        image_id = graphene.ID(required=True)

    Output = Image

    def mutate(root, info, training_set_id, image_id):
        image_record = ImageDB.query.get(image_id)
        training_set_record = TrainingSetDB.query.get(training_set_id)
        image_record.training_set_id = training_set_record.id
        db.session.commit()
        return Image(
            id=image_record.id,
            path=image_record.path,
            training_set=TrainingSet(
                id=training_set_record.id,
                name=training_set_record.name))
